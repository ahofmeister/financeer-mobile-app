import DefaultLayout from "Layout/DefaultLayout";
import {Pressable, SectionList, View} from "react-native";
import {fetchTransactions} from "api/backend";
import {useEffect, useState} from "react";
import MonthPicker from "transactions/MonthPicker";
import FinanceerText from "components/FinanceerText";
import TransactionAmount from "transactions/TransactionAmount";
import {useNavigation} from "@react-navigation/native";
import {routes} from "routes";

const TransactionsScreen = () => {

    const [currentDate, setCurrentDate] = useState(new Date())

    const [transactions, setTransactions] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        fetchTransactions(currentDate).then((response) => setTransactions(groupTransactionsByDate(response)))
    }, [currentDate])


    return <DefaultLayout>
        <MonthPicker callBack={setCurrentDate} currentDate={currentDate}/>

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
    className={"text-sm text-primary text-left mb-3"}>{datetime}</FinanceerText>

const groupTransactionsByDate = (transactions = []) => {
    transactions = sortByDatetime(transactions)
    return Object.values(transactions.reduce((result, transaction) => {
        if (result[transaction.datetime] === undefined) {
            result[transaction.datetime] = {datetime: transaction.datetime, data: []}
        }
        result[transaction.datetime].data.push(transaction);
        return result;
    }, {}));
}

const sortByDatetime = transactions => transactions.sort((a, b) => a.datetime > b.datetime)


export default TransactionsScreen
