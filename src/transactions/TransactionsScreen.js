import DefaultLayout from "Layout/DefaultLayout";
import {SectionList, View} from "react-native";
import {fetchTransactions} from "api/backend";
import {useEffect, useState} from "react";
import MonthPicker from "transactions/MonthPicker";
import FinanceerText from "components/FinanceerText";
import TransactionAmount from "transactions/TransactionAmount";

const TransactionsScreen = () => {

    const [currentDate, setCurrentDate] = useState(new Date())

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions(currentDate).then((response) =>
            setTransactions(groupTransactionsByDate(response)))
    }, [currentDate])


    let renderSectionHeader = ({section: {datetime}}) => {
        return <FinanceerText className={"text-primary font-bold"}>{datetime}</FinanceerText>;
    }

    return <DefaultLayout>
        <MonthPicker callBack={setCurrentDate} currentDate={currentDate}/>

        <SectionList
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={renderSectionHeader}
            className={"mt-5"} sections={transactions} renderItem={({item}) => {
            return <View className={"flex-row h-10 w-full justify-between"}>
                <FinanceerText className={"w-20"}>{item.description}</FinanceerText>
                <FinanceerText className={"w-30"}>{item.category.name}</FinanceerText>
                <TransactionAmount type={item.type} amount={item.amount}/>
            </View>
        }
        }/>

    </DefaultLayout>
}

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