import DefaultLayout from "Layout/DefaultLayout";
import {ScrollView} from "react-native";
import {useEffect, useState} from "react";
import FinanceerText from "components/FinanceerText";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {endOfMonth, startOfMonth} from "date-fns";
import {routes} from "routes";
import FinanceerButton from "components/FinanceerButton";
import {fetchTransactions, findFirstTransaction, getProfile} from "api/backend";
import TransactionPage from "transactions/TransactionPage";
import {calculateSum} from "transactions/TransactionUtils";


const Greeting = () => {

    const [firstName, setFirstName] = useState();
    useEffect(() => {
        getProfile().then(response => setFirstName(response.firstName))
    }, [])

    if (!firstName) {
        return <></>
    }

    return <FinanceerText className={"text-2xl ml-3 mb-1"}>Hello {firstName}!</FinanceerText>;
};

const HomeScreen = () => {

    const [transactionByMonth, setTransactionByMonth] = useState([])
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const [firstTransaction, setFirstTransaction] = useState()

    useEffect(() => {
        if (isFocused) {
            findFirstTransaction().then(x => setFirstTransaction(x.data))
        }
    }, [isFocused]);

    useEffect(() => {
        if (firstTransaction) {
            fetchTransactions(startOfMonth(new Date(firstTransaction?.datetime)), endOfMonth(new Date())).then(response => {
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
    }, [firstTransaction])

    return <DefaultLayout>
        <Greeting/>

        <ScrollView horizontal className={"w-full"} pagingEnabled={true} style={{transform: [{scaleX: -1}]}}>
            {transactionByMonth.map(month => <TransactionPage key={month.datetime} month={month}/>)}
        </ScrollView>

        <FinanceerButton label={"New Transaction"} onPress={() => navigation.navigate(routes.transaction)}
                         classNames={"mt-2"}/>
    </DefaultLayout>
}

export default HomeScreen
