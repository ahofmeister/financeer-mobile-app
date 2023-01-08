import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useMemo, useRef, useState} from "react";
import {createTransaction, fetchCategories} from "api/backend";
import {useNavigation} from "@react-navigation/native";
import {capitalize} from "StringUtils";
import {BottomSheetBackdrop, BottomSheetModal} from "@gorhom/bottom-sheet";
import FinanceerText from "components/FinanceerText";
import {showMessage} from "react-native-flash-message";
import {routes} from "routes";
import FinanceerInput from "components/FinanceerInput";
import {theme} from "../../tailwind.config";
import {format} from "date-fns";


const TransactionView = ({route}) => {
        const sheetRef = useRef(null);
        const navigation = useNavigation();
        const transaction = route.params?.transaction

        const [id, setId] = useState(transaction ? transaction.id : undefined)
        const [type, setType] = useState(transaction ? transaction.type : 'EXPENSE')
        const [amount, setAmount] = useState(transaction ? String(transaction.amount) : '')
        const [description, setDescription] = useState(transaction ? transaction.description : '')
        const [date, setDate] = useState(transaction ? new Date(transaction.datetime) : new Date())
        const [category, setCategory] = useState(transaction ? transaction.category : {})
        const [categories, setCategories] = useState([]);

        const handleTypeChange = (type) => {
            setType(type)
            navigation.setOptions({title: capitalize(type)})
        };

        useEffect(() => {
            fetchCategories().then(response => {
                console.log(response)
                setCategories(response.map((item) => ({id: item.id, name: item.name})))
            })

        }, [])

        const snapPoints = useMemo(() => ["50"], []);

        return <ScrollView>

            <BottomSheetModal handleStyle={styles.handleStyle} handleIndicatorStyle={styles.indicatorStyle}
                              ref={sheetRef}
                              snapPoints={snapPoints}
                              backgroundStyle={styles.backgroundStyle}
                              backdropComponent={(props) => (
                                  <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0}
                                                       opacity={0} {...props} />)}
            >

                <ScrollView className={"bg-neutral"}>
                    <View className={"flex-row flex-wrap"}>
                        {categories.map((item) =>
                            <View className={"w-1/3 h-20 border-gray border-1"}>
                                <Pressable className={"h-full justify-center"} onPress={() => {
                                    setCategory(item)
                                    sheetRef.current.close()
                                }}>
                                    <View>
                                        <FinanceerText
                                            className={"w-full text-center"}>{item.name}</FinanceerText>
                                    </View>
                                </Pressable>
                            </View>)}
                    </View>
                </ScrollView>
            </BottomSheetModal>
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
                <FinanceerInput
                    label={"Amount"}
                    className={"mt-1 text-white h-10"}
                    keyboardType={'phone-pad'}
                    placeholderTextColor="white"
                    value={amount}
                    onChangeText={setAmount}
                />
                <View className={"mt-5"}>
                    <FinanceerInput label={"Description"}
                                    className={"mt-1 text-white h-10"}
                                    placeholderTextColor="white"
                                    value={description}
                                    onChangeText={setDescription}
                    />
                </View>
                <View className={"mt-5"}>
                    <Pressable onPress={() => navigation.navigate(routes.calendar, {
                        callback: setDate,
                        date,
                        transactionType: type
                    })}>
                        <FinanceerInput onTouchStart={() => navigation.navigate(routes.calendar, {
                            callback: setDate,
                            date,
                            transactionType: type
                        })} label={"Date"}>{format(date, 'dd.MM.yyyy')}</FinanceerInput>
                    </Pressable>
                </View>

                <View className={"mt-5"}>
                    <FinanceerText>Category</FinanceerText>
                    <Pressable onPress={() => sheetRef.current.present()}>
                        <View
                            className={"mt-1 h-10"}>
                            <FinanceerText>{category?.name}</FinanceerText>
                        </View>
                    </Pressable>
                </View>

                <Pressable
                    className={"bg-secondary rounded text-center mt-0"}
                    onPress={async () => {
                        const {
                            data,
                            error
                        } = await createTransaction(id || undefined, amount, type, date.toISOString(), description, category.id)
                        if (data) {
                            showMessage({
                                    message: "Success",
                                    type: 'success',
                                }
                            );
                            navigation.navigate(routes.transactions)
                        }

                        if (error) {
                            showMessage({
                                    message: error.message,
                                    type: 'danger',
                                }
                            );
                        }
                    }}>
                    <FinanceerText
                        className={"w-11/12 h-15 rounded mx-auto mt-2 text-center bg-primary"}>Save</FinanceerText>
                </Pressable>
            </View>
        </ScrollView>


    }
;

const styles = StyleSheet.create({
    handleStyle: {
        borderTopColor: theme.extend.colors.primary,
        borderTopWidth: 1,
        backgroundColor: theme.extend.colors.neutral,
    }, indicatorStyle: {
        backgroundColor: theme.extend.colors.primary
    },
    backgroundStyle: {
        backgroundColor: theme.extend.colors.neutral
    }

});

export default TransactionView
