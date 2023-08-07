import FinanceerText from "components/FinanceerText";
import {Dimensions, ScrollView, View} from "react-native";
import {getCategoriesTotalByDate} from "api/backend";
import {useEffect, useState} from "react";
import TransactionAmount from "transactions/TransactionAmount";
import {useIsFocused} from "@react-navigation/native";
import {endOfYear, format, startOfYear} from "date-fns";

export const sumTotal = (transactions) => transactions.reduce((partialSum, transaction) => partialSum + transaction.sum, 0)

const StatsScreen = () => {

    const [categories, setCategories] = useState([])

    const isFocused = useIsFocused()

    const [dateFrom, setDateFrom] = useState(startOfYear(new Date()))
    const [dateTo, setDateTo] = useState(endOfYear(new Date()))

    useEffect(() => {
        if (isFocused) {
            getCategoriesTotalByDate(dateFrom, dateTo).then(r => {
                const allMonth = r.data.reduce((groups, item) => {
                    const month = `${item.year}-${item.month}`
                    if (!groups[month]) {
                        groups[month] = [];
                    }
                    groups[month].push(item);
                    return groups;
                }, {})

                const categoriesPerMonth = Object.keys(allMonth).map((month) => {
                    return {
                        year: month.split('-')[0],
                        month: month.split('-')[1],
                        categories: allMonth[month]
                    };
                });
                setCategories(categoriesPerMonth)
            })

        }
    }, [isFocused, dateFrom, dateTo])

    return <View>
        <ScrollView horizontal className={"w-full"} pagingEnabled={true} style={{transform: [{scaleX: -1}]}}>
            {categories.map(month => <CategoryPage month={month}/>)}
        </ScrollView>
    </View>
}

const CategoryPage = ({month}) => <View className={"h-full"} style={{transform: [{scaleX: -1}]}}>
    <View className={"flex-row m-2"}>
        <View className={"flex-1"}>
            <TransactionAmount amount={sumTotal(month.categories.filter(category => category.sum > 0))}
                               className={"text-2xl"}/>
            <TransactionAmount amount={sumTotal(month.categories.filter(category => category.sum < 0))}
                               className={" text-2xl"}/>
        </View>

        <View>
            <FinanceerText className={"text-2xl text-right"}>
                {format(new Date(month.year, month.month, 0), 'MMM yyyy')}
            </FinanceerText>
            <TransactionAmount amount={sumTotal(month.categories)} className={"text-2xl text-right"}/>
        </View>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style={{width: Dimensions.get("screen").width}}>
        {month.categories.map(category => <View className={"flex-row h-14 items-center my-2 bg-gray"}>
                <View className={`w-6/12 mx-3 pr-3`}>
                    <FinanceerText className={"text-left"}>{category.name}</FinanceerText>
                </View>
                <View className={`w-3/12`}/>
                <View className={"w-3/12"}>
                    <TransactionAmount className={"text-right mr-9"} amount={category.sum}/>
                </View>
            </View>
        )}
    </ScrollView>
</View>

export default StatsScreen
