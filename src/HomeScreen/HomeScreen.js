import 'react-native-url-polyfill/auto'
import {useEffect, useState} from "react";
import {useWindowDimensions, View} from "react-native";
import CategoryTransactionList from "HomeScreen/CategoryTransactionList";
import Dashboard from "HomeScreen/Dashboard";
import {fetchCategories, fetchExpenses, fetchIncomes} from "api/backend";
import {addMonths, format, startOfMonth, subMonths} from "date-fns";
import DefaultLayout from "Layout/DefaultLayout";
import FinanceerText from "components/FinanceerText";
import {useSwipe} from "components/useSwipe";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";


const HomeScreen = () => {
    const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
    const [categories, setCategories] = useState([])
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])
    const FirstRoute = () => (
        <View className={"mt-3"}>
            <CategoryTransactionList transactions={expenses} categories={categories}/>
        </View>
    );

    const SecondRoute = () => (
        <CategoryTransactionList transactions={incomes} categories={categories}/>
    );

    const renderScene = SceneMap({
        expenses: FirstRoute,
        incomes: SecondRoute,
    });

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1))
    };

    const handlePreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1))
    };

    const {onTouchStart, onTouchEnd} = useSwipe(handleNextMonth, handlePreviousMonth, 4)


    useEffect(() => {
        fetchExpenses(currentDate).then(response => setExpenses(response))
        fetchIncomes(currentDate).then(response => setIncomes(response))
        fetchCategories().then(response => setCategories(response))

    }, [currentDate])

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'expenses', title: 'Expenses', color: 'red'},
        {key: 'incomes', title: 'Incomes', color: 'green'},
    ]);
    const renderTabBar = function (props) {
        return <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: props.navigationState.routes[props.navigationState.index].color
            }}
            style={{backgroundColor: 'transparent'}}
        />;
    };

    return <DefaultLayout>
        <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

            <View className={"flex-row items-center justify-center mt-10"}>
                <FinanceerText> {format(currentDate, 'MMMM')} | {currentDate.getFullYear()}</FinanceerText>
            </View>

            <View className={"items-center my-5"}>
                <Dashboard expenses={expenses} incomes={incomes}/>
            </View>
        </View>
        <TabView
            navigationState={{index, routes}}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
        />
    </DefaultLayout>
}


export default HomeScreen