import DefaultLayout from "Layout/DefaultLayout";
import {ScrollView} from "react-native";
import {useEffect, useState} from "react";
import FinanceerText from "components/FinanceerText";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {calculateSum} from "transactions/TransactionUtils";
import {endOfMonth, startOfMonth, subMonths} from "date-fns";
import {routes} from "routes";
import FinanceerButton from "components/FinanceerButton";
import {fetchTransactions} from "api/backend";
import TransactionPage from "transactions/TransactionPage";


const HomeScreen = () => {

    const [transactionByMonth, setTransactionByMonth] = useState([])
    const [from, setFrom] = useState(subMonths(new Date(), 1))
    const [to, setTo] = useState(new Date())
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    useEffect(() => {
        if (isFocused) {
            fetchTransactions(startOfMonth(from), endOfMonth(to)).then(response => {
                const allMonth = response.reduce((groups, transaction) => {
                    const month = startOfMonth(new Date(transaction.datetime))
                    if (!groups[month]) {
                        groups[month] = [];
                    }
                    groups[month].push(transaction);
                    return groups;
                }, {});

                const transactionsByMonth = Object.keys(allMonth).map((month) => {
                    return {
                        datetime: month,
                        sum: calculateSum(allMonth[month]),
                        transactions: allMonth[month]
                    };
                });


                setTransactionByMonth(transactionsByMonth.sort((a, b) =>
                    new Date(a.datetime).getTime() + new Date(b.datetime).getTime()))
            })
        }
    }, [isFocused]);

    return <DefaultLayout>
        <FinanceerText className={"text-2xl ml-3 mb-1"}>Hello!</FinanceerText>

        <ScrollView horizontal className={"w-full"} pagingEnabled={true} style={{transform: [{scaleX: -1}]}}>
            {transactionByMonth.map(month => <TransactionPage key={month.datetime} month={month}/>)}
        </ScrollView>

        <FinanceerButton label={"New Transaction"} onPress={() => navigation.navigate(routes.transaction)}
                         classNames={"mt-2"}/>
    </DefaultLayout>
}

export default HomeScreen
