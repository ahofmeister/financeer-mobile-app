import {Pressable, View} from "react-native";
import {Calendar, LocaleConfig} from "react-native-calendars/src/index";
import {theme} from "../../tailwind.config";
import {format} from "date-fns";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import FinanceerText from "components/FinanceerText";
import {routes} from "routes";


LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
LocaleConfig.defaultLocale = 'en';

const CalendarScreen = ({route}) => {

    const callback = route.params.callback;
    const initialDate = route.params.date;
    const transactionType = route.params.transactionType

    const navigation = useNavigation();

    const [selectedDate, setSelectedDate] = useState(initialDate)

    return <>
        <Pressable onPress={() => {
            callback(selectedDate)
            return navigation.navigate(routes.transaction, {transactionType});
        }}>
            <FinanceerText
                className={"w-20 mx-auto font-bold text-primary"}>Done</FinanceerText>
        </Pressable>


        <View className={"w-full"}>
            <View className={"h-20"}>
                <Pressable onPress={() => navigation.navigate(routes.transaction, {transactionType})}>
                    <FinanceerText className={"m-5 text-right"}>X</FinanceerText>
                </Pressable>
            </View>

            <Calendar
                theme={{
                    calendarBackground: theme.extend.colors.neutral,
                    selectedDayBackgroundColor: theme.extend.colors.primary,
                    todayTextColor: theme.extend.colors.primary,
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    selectedDotColor: theme.extend.colors.neutral,
                    arrowColor: theme.extend.colors.white,
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: theme.extend.colors.white,
                    indicatorColor: theme.extend.colors.neutral,
                    textDayFontFamily: 'sans',
                    textMonthFontFamily: 'sans',
                    textDayHeaderFontFamily: 'sans',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
                initialDate={format(selectedDate, 'yyyy-MM-dd')}
                onDayPress={day => {
                    setSelectedDate(new Date(day.dateString))

                }}
                monthFormat={'MMMM yyyy'}
                hideExtraDays={true}
                disableMonthChange={true}
                firstDay={1}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                enableSwipeMonths={true}
            />

        </View>
    </>

}
export default CalendarScreen
