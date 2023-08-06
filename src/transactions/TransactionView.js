import {ScrollView, View} from "react-native";
import {useRef, useState} from "react";
import {deleteTransaction, saveTransaction} from "api/backend";
import {useNavigation} from "@react-navigation/native";
import FinanceerText from "components/FinanceerText";
import {showMessage} from "react-native-flash-message";
import {routes} from "routes";
import FinanceerInput from "components/FinanceerInput";
import FinanceerButton from "components/FinanceerButton";
import FakeCurrencyInput from "components/currency/FakeCurrencyInput";
import {format} from "date-fns";
import CalendarBottomSheet from "components/CalendarBottomSheet";
import {TouchableOpacity} from "react-native-gesture-handler";
import CategoryPicker from "categories/CategoriePicker";


const TransactionView = ({route}) => {
        const dateSheetRef = useRef();
        const navigation = useNavigation();
        const transaction = route.params?.transaction

        const id = transaction ? transaction.id : undefined
        const [type, setType] = useState(transaction && transaction.amount > 0 ? 'INCOME' : 'EXPENSE')
        const [amount, setAmount] = useState(transaction ? transaction.amount : 0)
        const [description, setDescription] = useState(transaction ? transaction.description : '')
        const [date, setDate] = useState(transaction ? new Date(transaction.datetime) : new Date())

        const [category, setCategory] = useState(transaction ? transaction.category : undefined)


        const handleTypeChange = (type) => {
            setType(type)
        }

        return <ScrollView showsVerticalScrollIndicator={false}>

            <CalendarBottomSheet initialDate={date} handleDayPress={(date) => setDate(date)} inputRef={dateSheetRef}/>

            <View className={"flex-row my-5"}>
                <View
                    className={`w-1/2 h-10 border justify-center ${type === 'INCOME' ? 'border-income' : 'border-gray'}`}>
                    <TouchableOpacity onPress={() => handleTypeChange('INCOME')}>
                        <FinanceerText
                            className={`w-full font-bold text-center ${type === 'INCOME' ? 'text-income' : 'text-white'}`}>Income</FinanceerText>
                    </TouchableOpacity>
                </View>

                <View
                    className={`w-1/2 h-10 border justify-center  ${type === 'EXPENSE' ? 'border-expense' : 'border-gray'}`}>
                    <TouchableOpacity onPress={() => handleTypeChange('EXPENSE')}>
                        <FinanceerText
                            className={`w-full font-bold text-center  ${type === 'EXPENSE' ? 'text-expense' : 'text-white'}`}>Expense</FinanceerText>
                    </TouchableOpacity>
                </View>
            </View>

            <View className={"m-3"}>
                <View className={"flex items-center"}>
                    <FakeCurrencyInput autofocus={!transaction}
                                       inputClassName={"text-4xl font-bold " + (type === 'EXPENSE' ? 'text-expense' : 'text-income')}
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
                    <TouchableOpacity onPress={() => dateSheetRef?.current?.present()}>
                        <View
                            className={"mt-1 h-10"}>
                            <FinanceerText>  {format(date, 'dd.MM.yyyy')}</FinanceerText>
                        </View>
                    </TouchableOpacity>

                </View>

                <CategoryPicker onSave={setCategory} initialCategory={transaction?.category}/>

                <FinanceerButton label={"Save"} onPress={async () => {
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
                        <FinanceerButton classNames={"bg-expense"} label={"Delete"} onPress={async () => {
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
