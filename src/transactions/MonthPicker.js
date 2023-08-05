import {View} from "react-native";
import {addMonths, format, subMonths} from "date-fns";
import FinanceerText from "components/FinanceerText";
import {useEffect, useState} from "react";
import {TouchableOpacity} from "react-native-gesture-handler";

const MonthPicker = ({onDateChange, currentDate}) => {

    const [nextDate, setNextDate] = useState(addMonths(currentDate, 1))
    const [previousDate, setPreviousDate] = useState(subMonths(currentDate, 1))

    useEffect(() => {
        setNextDate(addMonths(currentDate, 1))
    }, [currentDate])

    useEffect(() => {
        setPreviousDate(subMonths(currentDate, 1))
    }, [currentDate])

    return <View className={"flex-row items-center justify-around"}>
        <TouchableOpacity onPress={() => onDateChange(previousDate)}>
            <FinanceerText className={"text-gray"}>{format(subMonths(currentDate, 1), 'MMMM')}</FinanceerText>
            <FinanceerText className={"text-gray text-center"}> {currentDate.getFullYear()}</FinanceerText>
        </TouchableOpacity>
        <View>
            <FinanceerText className={"font-bold "}>{format(currentDate, 'MMMM')}</FinanceerText>
            <FinanceerText className={"font-bold text-center"}> {currentDate.getFullYear()}</FinanceerText>
        </View>
        <TouchableOpacity onPress={() => onDateChange(nextDate)}>
            <FinanceerText className={"text-gray"}>{format(nextDate, 'MMMM')}</FinanceerText>
            <FinanceerText className={"text-gray text-center"}> {nextDate.getFullYear()}</FinanceerText>
        </TouchableOpacity>
    </View>;
};

export default MonthPicker
