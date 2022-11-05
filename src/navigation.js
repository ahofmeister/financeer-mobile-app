import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {routes} from "routes";
import {createStackNavigator} from "@react-navigation/stack";
import {theme} from "../tailwind.config";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TransactionsScreen from "transactions/TransactionsScreen";
import HomeScreen from "HomeScreen/HomeScreen";
import AddTransactionScreen from "transactions/AddTransactionScreen";
import CalendarScreen from "transactions/CalendarScreen";
import CategoryScreen from "transactions/CategoryScreen";


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

    const Tab = createBottomTabNavigator();


    return (
        <NavigationContainer theme={FinanceerTheme}>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}}/>
                <Tab.Screen name="Transaction" component={TransactionsStackScreen} options={{headerShown: false}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const HomeStackScreen = () => {

    const HomeStack = createStackNavigator();

    return <HomeStack.Navigator>

        <HomeStack.Screen
            name={routes.home}
            component={HomeScreen}

        />
        <HomeStack.Screen
            options={{title: 'Add Transaction'}}
            name={routes.addTransaction}
            component={AddTransactionScreen}
        />

        <HomeStack.Screen
            name={routes.calendar}
            options={{title: ''}}
            component={CalendarScreen}
        />

        <HomeStack.Screen
            name={routes.categories}
            options={{title: ''}}
            component={CategoryScreen}
        />

    </HomeStack.Navigator>;

};

const TransactionsStackScreen = () => {
    const TransactionsStack = createStackNavigator();

    return <TransactionsStack.Navigator>

        <TransactionsStack.Screen
            name={routes.transactions}
            component={TransactionsScreen}
        />

    </TransactionsStack.Navigator>
}

export default Navigation
