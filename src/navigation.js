import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {routes} from "routes";
import {createStackNavigator} from "@react-navigation/stack";
import AddTransactionScreen from "transactions/AddTransactionScreen";
import HomeScreen from "HomeScreen/HomeScreen";
import {theme} from "../tailwind.config";
import CalendarScreen from "transactions/CalendarScreen";
import CategoryScreen from "transactions/CategoryScreen";

const {Navigator, Screen} = createStackNavigator()

const FinanceerTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: theme.colors.primary,
        background: theme.colors.neutral,
        card: theme.colors.neutral,
        text: theme.colors.white,
        border: theme.colors.neutral
    },
};


const Navigation = ({initialRoute = routes.home}) => {
    return (
        <NavigationContainer theme={FinanceerTheme}>
            <Navigator initialRouteName={initialRoute}>

                <Screen
                    name={routes.home}
                    component={HomeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Screen
                    options={{title: 'Add Transaction'}}
                    name={routes.addTransaction}
                    component={AddTransactionScreen}
                />

                <Screen
                    name={routes.calendar}
                    options={{title: ''}}
                    component={CalendarScreen}
                />

                <Screen
                    name={routes.categories}
                    options={{title: ''}}
                    component={CategoryScreen}
                />

            </Navigator>
        </NavigationContainer>
    )
}

export default Navigation
