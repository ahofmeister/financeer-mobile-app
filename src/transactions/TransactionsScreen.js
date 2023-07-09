import DefaultLayout from "Layout/DefaultLayout";
import {Pressable, SectionList, View} from "react-native";
import {fetchTransactions} from "api/backend";
import {useEffect, useState} from "react";
import FinanceerText from "components/FinanceerText";
import TransactionAmount from "transactions/TransactionAmount";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {routes} from "routes";
import {calculateSum} from "transactions/TransactionUtils";

const TransactionsScreen = () => {

    const [transactions, setTransactions] = useState([])
    const [rawTransactions, setRawTransactions] = useState([]);
    const [sum, setSum] = useState(0)

    const navigation = useNavigation();

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchTransactions(new Date()).then(function (response) {
                setRawTransactions(response)
                setTransactions(groupTransactionsByDate(response));
            })
        }
    }, [isFocused]);

    useEffect(() => {
        setSum(calculateSum(rawTransactions))
    }, [rawTransactions])

    return <DefaultLayout>
        <TransactionAmount amount={sum} className={"text-2xl text-center mb-5"}/>

        <SectionList bounces={false}
                     keyExtractor={(item, index) => item + index}
                     renderSectionHeader={SectionHeader}
                     className={"m-3"} sections={transactions} renderItem={({item}) =>
            <Pressable onPress={() => navigation.navigate(routes.transaction, {
                transaction: item
            })}>
                <View className={"flex-row h-10 w-full justify-between"}>
                    <FinanceerText numberOfLines={1} ellipsizeMode={'tail'}
                                   className={"w-24"}>{item.category.name}</FinanceerText>
                    <FinanceerText numberOfLines={1} ellipsizeMode={'tail'}
                                   className={"ml-3 flex-1"}>{item.description}</FinanceerText>
                    <TransactionAmount className={"w-24 text-right"} type={item.type} amount={item.amount}/>
                </View>
            </Pressable>}/>

    </DefaultLayout>
}

const SectionHeader = ({section: {datetime}}) => <FinanceerText
    className={"text-base text-primary text-left mb-3 font-bold"}>{datetime}</FinanceerText>

const groupTransactionsByDate = (transactions = []) => {
    return Object.values(transactions.reduce((result, transaction) => {
        if (result[transaction.datetime] === undefined) {
            result[transaction.datetime] = {datetime: transaction.datetime, data: []}
        }
        result[transaction.datetime].data.push(transaction);
        return result;
    }, {}));
}

export default TransactionsScreen
