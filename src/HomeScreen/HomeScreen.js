import 'react-native-url-polyfill/auto'
import {useEffect, useState} from "react";
import {Text, useWindowDimensions, View} from "react-native";
import CategoryTransactionList from "HomeScreen/CategoryTransactionList";
import {fetchCategories, fetchExpenses, fetchIncomes} from "api/backend";
import {startOfMonth} from "date-fns";
import DefaultLayout from "Layout/DefaultLayout";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {routes} from "routes";
import {theme} from "../../tailwind.config";
import Ionicons from "react-native-vector-icons/Ionicons";
import {calculateSum, formatAmount} from "transactions/TransactionUtils";
import MonthPicker from "transactions/MonthPicker";
import TransactionAmount from "transactions/TransactionAmount";
import {TouchableOpacity} from "react-native-gesture-handler";

const HomeScreen = () => {
    const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
    const [categories, setCategories] = useState([])
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])

    const [expensesSum, setExpensesSum] = useState(0)
    const [incomesSum, setIncomesSum] = useState(0)
    const [total, setTotal] = useState(0)

    let navigation = useNavigation();
    const isFocused = useIsFocused();

    const ExpensesRoute = () => (
        <View className={"mt-3"}>
            <CategoryTransactionList transactions={expenses} categories={categories} type={"EXPENSE"}
                                     sum={expensesSum}/>
        </View>
    );

    const IncomesRoute = () => (
        <View className={"mt-3"}>
            <CategoryTransactionList transactions={incomes} categories={categories} type={"INCOME"}
                                     sum={incomesSum}/>
        </View>
    );

    const renderScene = SceneMap({
        expenses: ExpensesRoute,
        incomes: IncomesRoute,
    });

    useEffect(() => {
        fetchExpenses(currentDate).then(response => setExpenses(response))
        fetchIncomes(currentDate).then(response => setIncomes(response))
        fetchCategories().then(response => setCategories(response))
    }, [currentDate, isFocused])

    useEffect(() => {
        setExpensesSum(calculateSum(expenses))
    }, [expenses])

    useEffect(() => {
        setIncomesSum(calculateSum(incomes))
    }, [incomes])

    useEffect(() => {
        setTotal(incomesSum + -expensesSum)
    }, [expensesSum, incomesSum])

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [inRoutes] = useState([
        {key: 'expenses', title: 'Expenses', color: theme.extend.colors.expense},
        {key: 'incomes', title: 'Incomes', color: theme.extend.colors.income},
    ]);
    const renderTabBar = props => {

        let state = props.navigationState;
        return <TabBar
            {...props}
            labelStyle={{
                color: theme.extend.colors.primary
            }}
            renderLabel={({route, focused, color}) =>
                <Text className={`font-bold ${route.key === 'expenses' ? 'text-expense' : 'text-income'}`}>
                    {route.title}
                </Text>}
            indicator style={{
            backgroundColor: 'transparent'
        }}
            Style={{
                backgroundColor: state.routes[props.navigationState.index].color
            }}

        />
    }
    return <DefaultLayout>
        <TouchableOpacity className={"self-end"} onPress={() => navigation.navigate(routes.profile)}>
            <Ionicons color={'white'} size={35} name={'person-circle'}/>
        </TouchableOpacity>
        <MonthPicker callBack={setCurrentDate} currentDate={currentDate}/>

        <View className={"items-center my-5"}>
            <TransactionAmount amount={formatAmount(total)}
                               className={"text-3xl font-bold text-center mb-5"}>
            </TransactionAmount>
        </View>

        <TabView
            navigationState={{index, routes: inRoutes}}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
        />

    </DefaultLayout>
}


export default HomeScreen
