import FinanceerText from "components/FinanceerText";
import {LogBox, ScrollView, View} from "react-native";
import {getTransactionsByCategorySummary} from "api/backend";
import {useEffect, useRef, useState} from "react";
import TransactionAmount from "transactions/TransactionAmount";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {endOfMonth, endOfYear, format, startOfMonth, startOfYear} from "date-fns";
import CalendarBottomSheet from "components/CalendarBottomSheet";
import {routes} from "routes";
import {TouchableOpacity} from "react-native-gesture-handler";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export const sumTotal = (transactions) => transactions.reduce((partialSum, transaction) => partialSum + transaction, 0)

const Summary = ({income, expense}) => {

    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(income + expense)
    }, [income, expense])

    return <View className={"mb-4 border-primary border-t pt-3"}>
        <View className={"flex-row justify-between"}>
            <FinanceerText className={""}>Income</FinanceerText>
            <TransactionAmount amount={income} className={""}/>
        </View>
        <View className={"flex-row justify-between"}>
            <FinanceerText className={""}>Expense</FinanceerText>
            <TransactionAmount amount={expense} className={""}/>
        </View>
        <View className={"flex-row justify-between mt-4"}>
            <FinanceerText className={`font-bold text-left`}>Total</FinanceerText>
            <TransactionAmount amount={total} className={"font-bold text-right"}/>
        </View>
    </View>
}

const StatsScreen = () => {

    const [transactionsPerCategory, setTransactionsPerCategory] = useState()
    const [income, setIncome] = useState()
    const [expense, setExpense] = useState()

    const isFocused = useIsFocused()

    const navigation = useNavigation()

    const [dateFrom, setDateFrom] = useState(startOfMonth(new Date()))
    const [dateTo, setDateTo] = useState(endOfMonth(new Date()))

    const dateFromRef = useRef(null)
    const dateToRef = useRef(null)

    useEffect(() => {
        if (isFocused) {
            getTransactionsByCategorySummary(dateFrom, dateTo).then(r => setTransactionsPerCategory(r.data))
        }
    }, [isFocused, dateFrom, dateTo])

    useEffect(() => {
        if (transactionsPerCategory) {
            const values = Object.values(transactionsPerCategory).map(t => t.total)
            setExpense(sumTotal(values.filter(a => a < 0)))
            setIncome(sumTotal(values.filter(a => a > 0)))
        }
    }, [transactionsPerCategory])

    return <View className={"flex-1 mx-4 mt-5"}>
        <View className={"flex-row justify-around"}>
            <View className={"w-1/3 h-10 border-gray border justify-center"}>
                <TouchableOpacity onPress={() => {
                    setDateFrom(startOfMonth(new Date()))
                    setDateTo(endOfMonth(new Date()))
                }}>
                    <FinanceerText className={"text-center"}>This Month</FinanceerText>
                </TouchableOpacity>
            </View>
            <View className={"w-1/3 h-10 border-gray border justify-center"}>
                <TouchableOpacity onPress={() => {
                    const previousMonth = new Date()
                    previousMonth.setDate(0)
                    setDateFrom(startOfMonth(previousMonth))
                    setDateTo(previousMonth)
                }}>
                    <FinanceerText className={"text-center"}>Last Month</FinanceerText>
                </TouchableOpacity>
            </View>
            <View className={"w-1/3 h-10 border-gray border justify-center"}>
                <TouchableOpacity onPress={() => {
                    setDateFrom(startOfYear(new Date()))
                    setDateTo(endOfYear(new Date()))
                }}>
                    <FinanceerText className={"text-center"}>This Year</FinanceerText>
                </TouchableOpacity>
            </View>
        </View>

        <View className={"flex-row justify-between my-4"}>
            <View className={"w-1/3 h-10 border-gray border justify-center"}>
                <TouchableOpacity onPress={() => dateFromRef.current.present()}>
                    <FinanceerText className={"text-center"}>{format(dateFrom, 'dd.MM.yyyy')}</FinanceerText>
                </TouchableOpacity>
                <CalendarBottomSheet initialDate={dateFrom} inputRef={dateFromRef}
                                     handleDayPress={(day) => setDateFrom(day)}/>
            </View>

            <View className={"w-1/3 h-10 border-gray border justify-center"}>
                <TouchableOpacity onPress={() => dateToRef.current.present()}>
                    <FinanceerText className={"text-center"}>{format(dateTo, 'dd.MM.yyyy')}</FinanceerText>
                </TouchableOpacity>
                <CalendarBottomSheet initialDate={dateTo} inputRef={dateToRef}
                                     handleDayPress={(day) => setDateTo(day)}/>
            </View>
        </View>

        <View className={"h-1 border-b-primary border-b"}/>

        <ScrollView className={"h-full my-2"} showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
            {transactionsPerCategory?.map((category) =>
                <TouchableOpacity key={category.name}
                                  onPress={() => navigation.navigate(routes.transactionsByCategory, {
                                      id: category.id,
                                      name: category.name,
                                      dateFrom,
                                      dateTo
                                  })}>

                    <View className={"flex-row h-14 items-center my-2 bg-gray"}>
                        <View className={"w-8/12"}>
                            <FinanceerText className={"w-24 ml-3"}>{category.name}</FinanceerText>

                        </View>
                        <View className={"w-4/12"}>
                            <TransactionAmount className={"w-24 text-right"} amount={category.total}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
        <Summary expense={expense} income={income}/>
    </View>
}

export default StatsScreen
