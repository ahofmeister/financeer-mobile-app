import 'react-native-url-polyfill/auto'
import {useEffect, useState} from "react";
import {View} from "react-native";
import CategoryExpenseList from "HomeScreen/CategoryExpenseList";
import Dashboard from "HomeScreen/Dashboard";
import {fetchCategories, fetchExpenses} from "api/backend";
import {addMonths, format, startOfMonth, subMonths} from "date-fns";
import DefaultLayout from "Layout/DefaultLayout";
import FinanceerText from "components/FinanceerText";
import {useSwipe} from "components/useSwipe";


const HomeScreen = () => {
    const [currentDate, setCurrentDate] = useState(startOfMonth(new Date()));
    const [categories, setCategories] = useState()
    const [expenses, setExpenses] = useState()

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1))
    };

    const handlePreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1))
    };

    const {onTouchStart, onTouchEnd} = useSwipe(handlePreviousMonth, handleNextMonth, 4)


    useEffect(() => {
        fetchExpenses(currentDate).then(response => setExpenses(response))
        fetchCategories().then(response => setCategories(response))

    }, [currentDate])

    return <DefaultLayout>
        <View className={"items-center mt-10"}>
            <Dashboard date={currentDate}/>
        </View>

        <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <View className={"flex-row items-center justify-center my-5"}>
                <FinanceerText> {format(currentDate, 'MMMM')} | {currentDate.getFullYear()}</FinanceerText>
            </View>
            <CategoryExpenseList expenses={expenses} categories={categories}/>
        </View>
    </DefaultLayout>
}


export default HomeScreen