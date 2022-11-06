import DefaultLayout from "Layout/DefaultLayout";
import FinanceerText from "components/FinanceerText";
import {FlatList, View} from "react-native";
import {fetchTransactions} from "api/backend";
import {useEffect, useState} from "react";
import TransactionAmount from "transactions/TransactionAmount";
import MonthPicker from "transactions/MonthPicker";

const TransactionsScreen = () => {

    const [currentDate, setCurrentDate] = useState(new Date())

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions(currentDate).then((response) => setTransactions(response))
    }, [currentDate])


    return <DefaultLayout>
        <MonthPicker callBack={setCurrentDate} currentDate={currentDate}/>

        <FlatList className={"mt-5"} data={transactions} renderItem={({item}) => {
            return <View className={"flex-row h-10 w-full justify-between"}>
                <FinanceerText className={"w-1/5"}>{item.description}</FinanceerText>
                <FinanceerText className={"w-2/5"}>{item.category.name}</FinanceerText>
                <TransactionAmount type={item.type} amount={item.amount}/>
            </View>
        }
        }/>

    </DefaultLayout>
}

export default TransactionsScreen