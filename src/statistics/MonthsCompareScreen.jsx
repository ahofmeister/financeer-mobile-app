import FinanceerText from "components/FinanceerText";
import {useEffect, useRef, useState} from "react";
import {getAvailableMonthsAndYears, getCategoriesTotalByDate} from "api/backend";
import {ScrollView, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {format, lastDayOfMonth, startOfMonth, subMonths} from "date-fns";
import {TouchableOpacity} from "react-native-gesture-handler";
import FinanceerBottomSheet from "components/FinanceerBottomSheet";
import TransactionAmount from "transactions/TransactionAmount";
import Percentage from "components/Percentage";
import LabelBox from "components/Box";

const groupByYear = data =>
    data?.reduce((groups, item) => {
        const group = (groups[item.year] || []);
        group.push(item.month);
        groups[item.year] = group;
        return groups;
    }, {});

const groupByCategory = data =>
    data?.reduce((groups, item) => {
        groups[item.name] = item.sum;
        return groups;
    }, {});

const addCategories = (setCategories, categories) => {
    setCategories(state => [...state, ...categories.map(x => x.name).filter(c => !state.includes(c))])
};

const getMonthName = month => format(new Date(1, month, 3), 'LLLL');

const MonthYearSelector = ({data, date, onPress}) => {
    const monthSelectorRef = useRef()

    const [selectedYear, setSelectedYear] = useState()

    return <>
        <TouchableOpacity onPress={() => monthSelectorRef.current.present()}>
            <View>
                <FinanceerText className={"text-center font-bold"}>{format(date, 'LLLL')}</FinanceerText>
                <FinanceerText className={"text-center font-bold"}>{format(date, 'yyyy')}</FinanceerText>
            </View>
        </TouchableOpacity>
        <FinanceerBottomSheet intRef={monthSelectorRef}>
            <View className={"flex-row flex-wrap"}>
                {!selectedYear && Object.keys(data).map(year =>
                    <LabelBox key={year} onPress={() => setSelectedYear(year)} label={year}/>
                )}
                {selectedYear && <>
                    {data[selectedYear].map(month =>
                        <LabelBox label={getMonthName(month - 1)} onPress={() => {
                            onPress(new Date(selectedYear, month - 1, 1))
                            setSelectedYear(null)
                            monthSelectorRef.current.close()
                        }}/>
                    )
                    }</>
                }
            </View>
        </FinanceerBottomSheet>
    </>
}


const TransactionPercentage = ({amount, totalIncome, totalExpense}) => <>
    <TransactionAmount className={"text-center"} amount={amount}/>
    {amount > 0 &&
        <Percentage amount={amount} total={totalIncome}/>
    }
    {amount < 0 &&
        <Percentage amount={amount} total={totalExpense}/>
    }
</>
const totalSumIncome = month => Object.values(month).reduce((partialSum, month) => {
    if (month > 0) {
        return partialSum + month;
    }
    return partialSum;
}, 0);

const totalSumExpense = month => Object.values(month).reduce((partialSum, month) => {
    if (month < 0) {
        return partialSum + month;
    }
    return partialSum;
}, 0);


const TransactionsByCategoryScreen = () => {
    const [data, setData] = useState()
    const [dateFrom, setDateFrom] = useState(subMonths(new Date(), 1))
    const [dateTo, setDateTo] = useState(new Date())

    const [firstMonth, setFirstMonth] = useState([])
    const [totalFirstMonthIncome, setTotalFirstMonthIncome] = useState(0)
    const [totalFirstMonthExpense, setTotalFirstMonthExpense] = useState(0)

    const [secondMonth, setSecondMonth] = useState([])
    const [totalSecondMonthIncome, setTotalSecondMonthIncome] = useState(0)
    const [totalSecondMonthExpense, setTotalSecondMonthExpense] = useState(0)

    const isFocused = useIsFocused();
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (isFocused) {
            getAvailableMonthsAndYears().then(response => setData(groupByYear(response.data)))
            getCategoriesTotalByDate(startOfMonth(dateFrom), lastDayOfMonth(dateFrom))
                .then(response => {
                    addCategories(setCategories, response.data);
                    setFirstMonth(groupByCategory(response.data));
                })
        }
    }, [isFocused, dateFrom])

    useEffect(() => {
        if (isFocused) {
            getCategoriesTotalByDate(startOfMonth(dateTo), lastDayOfMonth(dateTo))
                .then(response => {
                    addCategories(setCategories, response.data);
                    setSecondMonth(groupByCategory(response.data));
                })
        }
    }, [isFocused, dateTo])

    useEffect(() => {
        setTotalFirstMonthExpense(totalSumExpense(firstMonth))
        setTotalFirstMonthIncome(totalSumIncome(firstMonth))
    }, [firstMonth])

    useEffect(() => {
        setTotalSecondMonthExpense(totalSumExpense(secondMonth))
        setTotalSecondMonthIncome(totalSumIncome(secondMonth))
    }, [secondMonth])

    if (!data) {
        return <FinanceerText>Loading...</FinanceerText>
    }

    return <ScrollView className={"m-2"}>
        <FinanceerText
            className={"text-xl text-center font-bold my-2"}>{getMonthName(dateFrom.getMonth())} vs. {getMonthName(dateTo.getMonth())}</FinanceerText>
        <View className={"flex-row h-14 items-center my-2 bg-gray"}>
            <View className={`w-3/12 mx-3 pr-3`}>
                <FinanceerText className={"font-bold text-left"}>Category</FinanceerText>
            </View>
            <View className={"w-3/12"}>
                <MonthYearSelector data={data} date={dateFrom} onPress={setDateFrom}/>
            </View>
            <View className={"w-3/12"}>
                <MonthYearSelector data={data} date={dateTo} onPress={setDateTo}/>
            </View>

            <View className={"w-3/12"}>
                <FinanceerText className={"text-center font-bold"}>Diff</FinanceerText>
            </View>
        </View>
        {
            categories?.map(category => {
                    const firstMonthAmount = firstMonth[category]
                    const secondMonthAmount = secondMonth[category]

                    return <View key={category}>
                        <View className={"flex-row h-14 items-center my-2 bg-gray"}>
                            <View className={"w-3/12 mx-3 pr-3"}>
                                <FinanceerText numberOfLines={1} ellipsizeMode={'tail'}
                                               className={"text-left"}>{category}</FinanceerText>
                            </View>
                            <View className={"w-3/12"}>
                                <TransactionPercentage amount={firstMonthAmount} totalExpense={totalFirstMonthExpense}
                                                       totalIncome={totalFirstMonthIncome}/>
                            </View>
                            <View className={"w-3/12"}>
                                <TransactionPercentage amount={secondMonthAmount} totalExpense={totalSecondMonthExpense}
                                                       totalIncome={totalSecondMonthIncome}/>
                            </View>

                            <View className={"w-3/12"}>
                                <TransactionAmount className={"text-center"}
                                                   amount={(secondMonthAmount || 0) - (firstMonthAmount || 0)}/>
                            </View>
                        </View>
                    </View>;
                }
            )
        }
    </ScrollView>
}

export default TransactionsByCategoryScreen
