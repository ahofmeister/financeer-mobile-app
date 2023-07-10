import FinanceerText from "components/FinanceerText";
import {fetchTransactionsByCategory} from "api/backend";
import {FlatList, Pressable, View} from "react-native";
import {useEffect, useState} from "react";
import TransactionAmount from "transactions/TransactionAmount";

const TransactionsByCategoryScreen = (props) => {

    const params = props.route.params
    const dateFrom = params.dateFrom
    const dateTo = params.dateTo
    const categoryName = params.name
    const categoryId = params.id

    const [transactions, setTransactions] = useState()

    useEffect(() => {
        fetchTransactionsByCategory(dateFrom, dateTo, categoryId).then(c => setTransactions(c))
    }, [])

    return <View>
        <FinanceerText className={"text-2xl text-center mb-4"}>{categoryName}</FinanceerText>

        <FlatList className={"mb-5 h-full"} data={transactions} renderItem={({item, index}) => {
            return <View
                className={`flex-row px-5 py-2 mt-1}`}>
                <FinanceerText className={"flex-1"}>{item.description || categoryName}</FinanceerText>
                <TransactionAmount amount={item.amount}></TransactionAmount>
            </View>
        }
        }/>
    </View>
}

export default TransactionsByCategoryScreen
