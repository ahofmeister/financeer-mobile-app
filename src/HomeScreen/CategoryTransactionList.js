import 'react-native-url-polyfill/auto'
import {FlatList, View} from "react-native";
import FinanceerText from "components/FinanceerText";

const CategoryTransactionList = ({transactions, categories}) => {
    if (!transactions) {
        return
    }
    const transactionsByCategory = groupBy(transactions, categories)


    function formatAmount(amount) {
        return round(amount / 100, 2)
    }

    const round = (value, fractionDigits = 1) => {
        if (fractionDigits < 0) throw new Error(`negative fraction: ${fractionDigits}`)

        const factor = Math.pow(10, fractionDigits)

        return value ? Math.round((value + Number.EPSILON) * factor) / factor : 0
    }


    return transactionsByCategory ? (<View className={""}>
        <FlatList
            data={transactionsByCategory}
            renderItem={({item}) =>
                <View className={"flex-row h-10"}>
                    <FinanceerText
                        className={"w-5"}>{item.transactions.length}</FinanceerText>
                    <FinanceerText className={"flex-1 text-left ml-5"}>{item.category}</FinanceerText>
                    <FinanceerText
                        className={"w-20 text-right"}>{formatAmount(item.amount)}</FinanceerText>
                </View>
            }
        />
    </View>) : <View><FinanceerText>Loading</FinanceerText></View>

}


const groupBy = (allExpenses, categories) => {


    if (categories && allExpenses) {
        const obj = categories.reduce((o, key) => Object.assign(o, {[key.name]: []}), {});

        if (allExpenses === 0) {
            return obj
        }

        let transactionsByCategory = []
        for (const item of categories) {
            let transactions = allExpenses.filter(x => x.category.name === item.name);
            transactionsByCategory.push({
                transactions: transactions,
                category: item.name,
                amount: sumExpenses(transactions)
            })

        }
        sortByAmount(transactionsByCategory);

        return transactionsByCategory;
    }

    return {}


}

const sumExpenses = (transactions) => transactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)

const sortByAmount = transactionsByCategory => transactionsByCategory.sort((a, b) => a.amount < b.amount)

export default CategoryTransactionList