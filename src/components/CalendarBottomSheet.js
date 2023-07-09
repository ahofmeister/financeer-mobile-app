import FinanceerBottomSheet from "components/FinanceerBottomSheet";
import {Calendar} from "react-native-calendars/src/index";
import {theme} from "../../tailwind.config";
import {format} from "date-fns";

const CalendarBottomSheet = ({handleDayPress, inputRef, initialDate}) => {

    return <FinanceerBottomSheet intRef={inputRef}>
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
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
            }}
            initialDate={format(initialDate, 'yyyy-MM-dd')}
            onDayPress={day => {
                handleDayPress(new Date(day.dateString))
                inputRef.current.close()
            }}
            monthFormat={'MMMM yyyy'}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            enableSwipeMonths={true}
        />

    </FinanceerBottomSheet>
}
export default CalendarBottomSheet
