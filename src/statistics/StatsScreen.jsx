import FinanceerText from "components/FinanceerText";
import {LogBox, Pressable, ScrollView, View} from "react-native";
import {getTransactionsByCategorySummary} from "api/backend";
import {useEffect, useRef, useState} from "react";
import TransactionAmount from "transactions/TransactionAmount";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {endOfMonth, endOfYear, format, startOfMonth, startOfYear} from "date-fns";
import CalendarBottomSheet from "components/CalendarBottomSheet";
import {routes} from "routes";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const StatsScreen = () => {

    const [data, setTransactions] = useState()
    const isFocused = useIsFocused()

    const navigation = useNavigation()

    const [dateFrom, setDateFrom] = useState(startOfMonth(new Date()))
    const [dateTo, setDateTo] = useState(endOfMonth(new Date()))

    const dateFromRef = useRef(null)
    const dateToRef = useRef(null)


    useEffect(() => {
        if (isFocused) {
            getTransactionsByCategorySummary(dateFrom, dateTo).then(r => setTransactions(r.data))
        }
    }, [isFocused, dateFrom, dateTo])

    return <View className={"mx-4 mt-5"}>

        <View className={"flex-row justify-around"}>
            <View className={"w-1/3 h-10 border-gray border-1 justify-center"}>
                <Pressable onPress={() => {
                    setDateFrom(startOfMonth(new Date()))
                    setDateTo(endOfMonth(new Date()))
                }}>
                    <FinanceerText className={"text-center"}>This Month</FinanceerText>
                </Pressable>
            </View>
            <View className={"w-1/3 h-10 border-gray border-1 justify-center"}>
                <Pressable onPress={() => {
                    const previousMonth = new Date()
                    previousMonth.setDate(0)
                    setDateFrom(startOfMonth(previousMonth))
                    setDateTo(previousMonth)
                }}>
                    <FinanceerText className={"text-center"}>Last Month</FinanceerText>
                </Pressable>
            </View>
            <View className={"w-1/3 h-10 border-gray border-1 justify-center"}>
                <Pressable onPress={() => {
                    setDateFrom(startOfYear(new Date()))
                    setDateTo(endOfYear(new Date()))
                }}>
                    <FinanceerText className={"text-center"}>This Year</FinanceerText>
                </Pressable>
            </View>
        </View>

        <View className={"flex-row justify-between my-4"}>
            <View className={"w-1/3 h-10 border-gray border-1 justify-center"}>
                <Pressable onPress={() => dateFromRef.current.present()}>
                    <FinanceerText className={"text-center"}>{format(dateFrom, 'dd.MM.yyyy')}</FinanceerText>
                </Pressable>
                <CalendarBottomSheet initialDate={dateFrom} inputRef={dateFromRef}
                                     handleDayPress={(day) => setDateFrom(day)}/>
            </View>

            <View className={"w-1/3 h-10 border-gray border-1 justify-center"}>
                <Pressable onPress={() => dateToRef.current.present()}>
                    <FinanceerText className={"text-center"}>{format(dateTo, 'dd.MM.yyyy')}</FinanceerText>
                </Pressable>
                <CalendarBottomSheet initialDate={dateTo} inputRef={dateToRef}
                                     handleDayPress={(day) => setDateTo(day)}/>
            </View>
        </View>

        <View className={"h-1 border-b-primary border-b-1 my-5"}/>

        {data?.length <= 0 && <FinanceerText className={"text-center"}>No transactions</FinanceerText>}

        <ScrollView className={"h-full"}>
            {data?.map((category) =>
                <Pressable key={category.category} onPress={() => navigation.navigate(routes.transactionsByCategory, {
                    id: category.id,
                    name: category.name,
                    dateFrom,
                    dateTo
                })}>
                    <View className={"flex-row h-12 justify-between"}>
                        <FinanceerText className={"w-24"}>{category.name}</FinanceerText>
                        <TransactionAmount className={"w-24 text-right"} amount={category.amount}/>
                    </View>
                </Pressable>
            )}
        </ScrollView>
    </View>
}

export default StatsScreen
