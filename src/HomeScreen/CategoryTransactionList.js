import 'react-native-url-polyfill/auto'
import {FlatList, View} from "react-native";
import FinanceerText from "components/FinanceerText";
import TransactionAmount from "transactions/TransactionAmount";

const CategoryTransactionList = ({transactions = [], categories, sum = 0, type}) => {
    const transactionsByCategory = groupBy(transactions, categories)

    return transactionsByCategory ? (
        <View>
            <View className={"flex-row justify-center"}>
                <TransactionAmount type={type} amount={sum}/>
            </View>
            <FlatList
                data={transactionsByCategory}
                renderItem={function ({item}) {
                    return <View className={"flex-row mx-1 h-10 justify-between"}>
                        <FinanceerText className={"flex-1 text-left ml-5"}>{item.category}</FinanceerText>
                        <FinanceerText
                            className={"w-20 text-right"}>
                            <TransactionAmount type={type} amount={item.amount}/>
                        </FinanceerText>
                    </View>;
                }
                }
            />
        </View>) : <View><FinanceerText>Loading</FinanceerText></View>

}


const groupBy = (allExpenses, categories) => {
    if (categories && allExpenses) {

        if (allExpenses === 0) {
            return categories.reduce((o, key) => Object.assign(o, {[key.name]: []}), {});
        }

        let transactionsByCategory = []
        for (const item of categories) {
            let expenses = allExpenses.filter(expense => expense.category.name === item.name);
            transactionsByCategory.push({
                transactions: expenses,
                category: item.name,
                amount: sumExpenses(expenses)
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
