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
            data={categories}
            renderItem={({item}) =>
                <View className={"flex-row h-10"}>
                    <FinanceerText className={"w-5"}>{expensesByCategory[item.name] ? expensesByCategory[item.name].length : 0}</FinanceerText>
                    <FinanceerText className={"flex-1 text-left ml-5"}>{item.name}</FinanceerText>
                    <FinanceerText className={"w-20 text-right"}>{formatAmount(calculateTotalPrice(expensesByCategory, [item.name]))}</FinanceerText>
                </View>
            }
        />
    </View>) : <View><FinanceerText>Loading</FinanceerText></View>

}


const groupBy = (expenses, categories) => {

    if (categories && expenses) {
        const obj = categories.reduce((o, key) => Object.assign(o, {[key.name]: []}), {});

        if (expenses === 0) {
            return obj
        }

        return expenses.reduce((acc, cur) => {
            return {...acc, [cur.category.name]: [...acc[cur.category.name], cur]}
        }, obj)
    }

    return {}


}

const calculateTotalPrice = (expenses, category) => {
    return expenses[category].reduce((partialSum, expense) => partialSum + expense.amount, 0);
};

export default CategoryExpenseList