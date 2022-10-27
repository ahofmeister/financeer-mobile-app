import 'react-native-url-polyfill/auto'
import {FlatList, View} from "react-native";
import FinanceerText from "components/FinanceerText";

const CategoryExpenseList = ({expenses, categories}) => {
    if (!expenses) {
        return
    }
    const expensesByCategory = groupBy(expenses, categories)


    function formatAmount(amount) {
        return round(amount / 100, 2)
    }

    const round = (value, fractionDigits = 1) => {
        if (fractionDigits < 0) throw new Error(`negative fraction: ${fractionDigits}`)

        const factor = Math.pow(10, fractionDigits)

        return value ? Math.round((value + Number.EPSILON) * factor) / factor : 0
    }


    return expensesByCategory ? (<View className={""}>
        <FlatList
            data={expensesByCategory}
            renderItem={({item}) =>
                <View className={"flex-row h-10"}>
                    <FinanceerText
                        className={"w-5"}>{item.expenses.length}</FinanceerText>
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

        let expensesByCategory = []
        for (const item of categories) {
            let expenses = allExpenses.filter(x => x.category.name === item.name);
            expensesByCategory.push({
                expenses: expenses,
                category: item.name,
                amount: sumExpenses(expenses)
            })

        }
        sortByAmount(expensesByCategory);

        return expensesByCategory;
    }

    return {}


}

const sumExpenses = (expenses) => expenses.reduce((partialSum, expense) => partialSum + expense.amount, 0)

const sortByAmount = expensesByCategory => expensesByCategory.sort((a, b) => a.amount < b.amount)

export default CategoryExpenseList