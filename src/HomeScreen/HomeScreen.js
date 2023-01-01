import 'react-native-url-polyfill/auto'
import {useEffect, useState} from "react";
import {Pressable, useWindowDimensions, View} from "react-native";
import CategoryTransactionList from "HomeScreen/CategoryTransactionList";
import Dashboard from "HomeScreen/Dashboard";
import {fetchCategories, fetchExpenses, fetchIncomes} from "api/backend";
import {startOfMonth} from "date-fns";
import DefaultLayout from "Layout/DefaultLayout";
import FinanceerText from "components/FinanceerText";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {routes} from "routes";
import {theme} from "../../tailwind.config";
import MonthPicker from "transactions/MonthPicker";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
    const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
    const [categories, setCategories] = useState([])
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])

    let navigation = useNavigation();
    const isFocused = useIsFocused();

    const ExpensesRoute = () => (
        <View className={"mt-3"}>
            <CategoryTransactionList type={'EXPENSE'} transactions={expenses} categories={categories}/>
        </View>
    );

    const IncomesRoute = () => (
        <View className={"mt-3"}>
            <CategoryTransactionList type={'INCOME'} transactions={incomes} categories={categories}/>
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

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [inRoutes] = useState([
        {key: 'expenses', title: 'Expenses', color: theme.extend.colors.accent},
        {key: 'incomes', title: 'Incomes', color: theme.extend.colors.primary},
    ]);
    const renderTabBar = props => <TabBar
        {...props}
        indicatorStyle={{
            backgroundColor: props.navigationState.routes[props.navigationState.index].color
        }}
        style={{backgroundColor: 'transparent'}}
    />;

    return <DefaultLayout>



        <Pressable className={"self-end"} onPress={() => navigation.navigate(routes.profile)}>
            <Ionicons color={'white'} size={35} name={'person-circle'}/>
        </Pressable>
        <MonthPicker callBack={setCurrentDate} currentDate={currentDate}/>

        <View className={"items-center my-5"}>
            <Dashboard expenses={expenses} incomes={incomes}/>
        </View>
        <Pressable
            className={"rounded text-center"}
            onPress={() => navigation.navigate(routes.addTransaction)}>
            <FinanceerText className={"text-center"}>Add Transaction</FinanceerText>
        </Pressable>

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