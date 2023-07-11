import {Pressable, ScrollView, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {deleteTransaction, fetchCategories, saveTransaction} from "api/backend";
import {useNavigation} from "@react-navigation/native";
import FinanceerText from "components/FinanceerText";
import {showMessage} from "react-native-flash-message";
import {routes} from "routes";
import FinanceerInput from "components/FinanceerInput";
import Button from "components/Button";
import FakeCurrencyInput from "components/currency/FakeCurrencyInput";
import {format} from "date-fns";
import FinanceerBottomSheet from "components/FinanceerBottomSheet";
import CalendarBottomSheet from "components/CalendarBottomSheet";

const TransactionView = ({route}) => {
        const categorySheetRef = useRef(null);
        const dateSheetRef = useRef(null);
        const navigation = useNavigation();
        const transaction = route.params?.transaction

        const [id, setId] = useState(transaction ? transaction.id : undefined)
        const [type, setType] = useState(transaction && transaction.amount > 0 ? 'INCOME' : 'EXPENSE')
        const [amount, setAmount] = useState(transaction ? transaction.amount : 0)
        const [description, setDescription] = useState(transaction ? transaction.description : '')
        const [date, setDate] = useState(transaction ? new Date(transaction.datetime) : new Date())
        const [category, setCategory] = useState(transaction ? transaction.category : {})
        const [categories, setCategories] = useState([]);

        const handleTypeChange = (type) => {
            setType(type)
        };

        useEffect(() => {
            fetchCategories().then(response => {
                setCategories(response.map((item) => ({id: item.id, name: item.name})))
            })

        }, [])

        return <ScrollView>
            <FinanceerBottomSheet intRef={categorySheetRef}>
                <ScrollView className={"bg-neutral"}>
                    <View className={"flex-row flex-wrap"}>
                        {categories.map((item) =>
                            <View key={item.name} className={"w-1/3 h-20 border-gray border-1"}>
                                <Pressable className={"h-full justify-center"} onPress={() => {
                                    setCategory(item)
                                    categorySheetRef.current.close()
                                }}>
                                    <View>
                                        <FinanceerText
                                            className={"w-full text-center"}>{item.name}</FinanceerText>
                                    </View>
                                </Pressable>
                            </View>)}
                    </View>
                </ScrollView>
            </FinanceerBottomSheet>
            <CalendarBottomSheet initialDate={date} handleDayPress={(date) => setDate(date)} inputRef={dateSheetRef}/>

            <View className={"flex-row my-5"}>
                <Pressable
                    className={`w-1/2 h-10 border-1 justify-center ${type === 'INCOME' ? 'border-income' : 'border-gray'}`}
                    onPress={() => handleTypeChange('INCOME')}>
                    <FinanceerText
                        className={`font-bold text-center ${type === 'INCOME' ? 'text-income' : 'text-white'}`}>Income</FinanceerText>
                </Pressable>

                <Pressable
                    className={`w-1/2 h-10 border-1 justify-center  ${type === 'EXPENSE' ? 'border-expense' : 'border-gray'}`}
                    onPress={() => handleTypeChange('EXPENSE')}>
                    <FinanceerText
                        className={`font-bold text-center  ${type === 'EXPENSE' ? 'text-expense' : 'text-white'}`}>Expense</FinanceerText>
                </Pressable>
            </View>

            <View className={"m-3"}>
                <View className={"flex items-center"}>
                    <FakeCurrencyInput autofocus={!transaction}
                        inputClassName={"text-4xl font-bold " + (type === 'EXPENSE' ? 'text-expense' : 'text-income')}
                        prefix={"€"}
                        value={amount}
                        onChangeValue={setAmount}
                    />
                </View>
                <View className={"mt-5"}>
                    <FinanceerInput label={"Description"}
                                    className={"mt-1 text-white h-10"}
                                    placeholderTextColor="white"
                                    value={description}
                                    onChangeText={setDescription}
                    />
                </View>
                <View className={"mt-5"}>
                    <FinanceerText>Date</FinanceerText>
                    <Pressable onPress={() => dateSheetRef?.current?.present()}>
                        <View
                            className={"mt-1 h-10"}>
                            <FinanceerText>  {format(date, 'dd.MM.yyyy')}</FinanceerText>
                        </View>
                    </Pressable>

                </View>

                <View className={"mt-5"}>
                    <FinanceerText>Category</FinanceerText>
                    <Pressable onPress={() => categorySheetRef.current.present()}>
                        <View
                            className={"mt-1 h-10"}>
                            <FinanceerText>{category?.name}</FinanceerText>
                        </View>
                    </Pressable>
                </View>

                <Button label={"Save"} onPress={async () => {
                    const {
                        data,
                        error
                    } = await saveTransaction(id || undefined, type === 'EXPENSE' ? -Math.abs(amount) : Math.abs(amount), date.toISOString(), description, category.id)
                    if (data) {
                        showMessage({
                                message: "Success",
                                type: 'success',
                            }
                        )
                        setAmount(null)
                        setDate(new Date())
                        setDescription(null)
                        navigation.navigate(routes.transactions)
                    }

                    if (error) {
                        showMessage({
                                message: error.message,
                                type: 'danger',
                            }
                        );
                    }
                }}/>

                {id &&
                    <View className={"mt-5"}>
                        <Button classNames={"bg-expense"} label={"Delete"} onPress={async () => {
                            const {error} = await deleteTransaction(id)
                            if (error) {
                                showMessage({
                                        message: error.message,
                                        type: 'danger',
                                    }
                                );
                            } else {
                                showMessage({
                                        message: "Success",
                                        type: 'success',
                                    }
                                );
                                navigation.navigate(routes.transactions)
                            }

                        }}/>
                    </View>
                }

            </View>
        </ScrollView>


    }
;


export default TransactionView
