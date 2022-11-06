import {Pressable, View} from "react-native";
import {addMonths, format, subMonths} from "date-fns";
import FinanceerText from "components/FinanceerText";

const MonthPicker = ({callBack, currentDate}) => <View className={"flex-row items-center justify-around mt-5"}>
    <Pressable onPress={() => callBack(subMonths(currentDate, 1))}>
        <FinanceerText className={"text-gray"}>{format(subMonths(currentDate, 1), 'MMMM')}</FinanceerText>
        <FinanceerText className={"text-gray text-center"}> {currentDate.getFullYear()}</FinanceerText>
    </Pressable>
    <View>
        <FinanceerText className={"font-bold"}>{format(currentDate, 'MMMM')}</FinanceerText>
        <FinanceerText className={"font-bold text-center"}> {currentDate.getFullYear()}</FinanceerText>
    </View>
    <Pressable onPress={() => callBack(addMonths(currentDate, 1))}>
        <FinanceerText className={"text-gray"}>{format(addMonths(currentDate, +1), 'MMMM')}</FinanceerText>
        <FinanceerText className={"text-gray text-center"}> {currentDate.getFullYear()}</FinanceerText>
    </Pressable>
</View>;

export default MonthPicker