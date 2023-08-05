import DefaultLayout from "Layout/DefaultLayout";
import {ActivityIndicator, ScrollView, TouchableHighlight, View} from "react-native";
import {fetchTransactions} from "api/backend";
import {useEffect, useState} from "react";
import FinanceerText from "components/FinanceerText";
import TransactionAmount from "transactions/TransactionAmount";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {calculateSum} from "transactions/TransactionUtils";
import MonthPicker from "transactions/MonthPicker";
import {format, startOfMonth} from "date-fns";
import {theme} from "../tailwind.config";
import {routes} from "routes";

const TransactionCard = ({transaction}) => {
    const navigation = useNavigation()
    return <TouchableHighlight onPress={() => navigation.navigate(routes.transaction, {transaction})}>
        <View className={"flex-row h-14 w-full my-2 bg-gray"}>
            <View className={`w-2/12 justify-center mx-3 pr-3 border-r-1`}>
                <FinanceerText
                    className={"uppercase text-center"}>{format(new Date(transaction.datetime), 'MMM')}</FinanceerText>
                <FinanceerText
                    className={"text-center"}>{format(new Date(transaction.datetime), 'dd')}</FinanceerText>
            </View>
            <View className={"justify-center w-6/12"}>
                <FinanceerText numberOfLines={1} ellipsizeMode={'tail'}
                               className={"text-xs"}>{transaction.description}</FinanceerText>
                <FinanceerText numberOfLines={1} ellipsizeMode={'tail'}
                               className={"text-lg"}>{transaction.category.name}</FinanceerText>

            </View>
            <View className={"justify-center w-4/12"}>
                <TransactionAmount className={"text-right mr-9"} type={transaction.type}
                                   amount={transaction.amount}/>
            </View>
        </View>
    </TouchableHighlight>
}

const HomeScreen = () => {

    const [transactions, setTransactions] = useState([]);
    const [sum, setSum] = useState(0)
    const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
    const [isLoading, setIsLoading] = useState(true)

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchTransactions(currentDate).then(response => {
                setTransactions(response)
                setIsLoading(false)
            })
        }
    }, [isFocused, currentDate]);

    useEffect(() => {
        setSum(calculateSum(transactions))
    }, [transactions])


    return <DefaultLayout>

        <MonthPicker onDateChange={date => {
            setCurrentDate(date)
            setIsLoading(true)
        }} currentDate={currentDate}/>

        {isLoading ?
            <View className={"text-center mt-10 text-primary"}>
                <ActivityIndicator size={"large"} color={theme.extend.colors.primary}/>
            </View> :
            <>
                <View className={"border-b-primary border-2 my-3"}></View>
                <TransactionAmount amount={sum} className={"text-2xl text-center"}/>
                <ScrollView showsVerticalScrollIndicator={false} className={"m-3"}>
                    {transactions.map(transaction =>
                        <TransactionCard key={transaction.id} transaction={transaction}/>
                    )}
                </ScrollView>
            </>
        }
    </DefaultLayout>
}

export default HomeScreen
