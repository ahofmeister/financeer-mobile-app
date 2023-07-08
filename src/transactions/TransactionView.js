import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useMemo, useRef, useState} from "react";
import {createTransaction, deleteTransaction, fetchCategories} from "api/backend";
import {useNavigation} from "@react-navigation/native";
import {capitalize} from "StringUtils";
import {BottomSheetBackdrop, BottomSheetModal} from "@gorhom/bottom-sheet";
import FinanceerText from "components/FinanceerText";
import {showMessage} from "react-native-flash-message";
import {routes} from "routes";
import FinanceerInput from "components/FinanceerInput";
import {theme} from "../../tailwind.config";
import Button from "components/Button";
import FakeCurrencyInput from "components/currency/FakeCurrencyInput";
import {Calendar} from "react-native-calendars/src/index";
import {format} from "date-fns";

const TransactionView = ({route}) => {
        const categorySheetRef = useRef(null);
        const dateSheetRef = useRef(null);
        const navigation = useNavigation();
        const transaction = route.params?.transaction

        const [id, setId] = useState(transaction ? transaction.id : undefined)
        const [type, setType] = useState(transaction ? transaction.type : 'EXPENSE')
        const [amount, setAmount] = useState(transaction ? transaction.amount : 0)
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
                setCategories(response.map((item) => ({id: item.id, name: item.name})))
            })

        }, [])

        const snapPoints = useMemo(() => ["50"], []);

        return <ScrollView>

            <BottomSheetModal handleStyle={styles.handleStyle} handleIndicatorStyle={styles.indicatorStyle}
                              ref={categorySheetRef}
                              snapPoints={snapPoints}
                              backgroundStyle={styles.backgroundStyle}
                              backdropComponent={(props) => (
                                  <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0}
                                                       opacity={0} {...props} />)}
            >

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
            </BottomSheetModal>
            <BottomSheetModal handleStyle={styles.handleStyle} handleIndicatorStyle={styles.indicatorStyle}
                              ref={dateSheetRef}
                              snapPoints={snapPoints}
                              backgroundStyle={styles.backgroundStyle}
                              backdropComponent={(props) => (
                                  <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0}
                                                       opacity={0} {...props} />)}
            >

                <Calendar
                    theme={{
                        calendarBackground: theme.extend.colors.neutral,
                        selectedDayBackgroundColor: theme.extend.colors.primary,
                        todayTextColor: theme.extend.colors.primary,
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        selectedDotColor: theme.extend.colors.neutral,
                        arrowColor: theme.extend.colors.white,
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: theme.extend.colors.white,
                        indicatorColor: theme.extend.colors.neutral,
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                    initialDate={format(date, 'yyyy-MM-dd')}
                    onDayPress={day => {
                        setDate(new Date(day.dateString))
                        dateSheetRef.current.close()

                    }}
                    monthFormat={'MMMM yyyy'}
                    hideExtraDays={true}
                    disableMonthChange={true}
                    firstDay={1}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    enableSwipeMonths={true}
                />


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
                <View className={"flex items-center"}>
                    <FakeCurrencyInput inputClassName={"text-4xl font-bold"}
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
                    <Pressable onPress={() => dateSheetRef.current.present()}>
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
                    console.log(amount)
                    const {
                        data,
                        error
                    } = await createTransaction(id || undefined, (type === 'EXPENSE' ? -amount : amount), date.toISOString(), description, category.id)
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
