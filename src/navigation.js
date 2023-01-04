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
import CategoriesScreen from "categories/CategoriesScreen";
import FlashMessage from "react-native-flash-message";
import React from "react";
import LoginScreen from "auth/LoginScreen";
import EditCategoryScreen from "categories/EditCategoryScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileScreen from "profile/ProfileScreen";
import {useUser} from "auth/AuthContext";
import {capitalize} from "StringUtils";


const FinanceerTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: theme.extend.colors.primary,
        background: theme.extend.colors.neutral,
        card: theme.extend.colors.neutral,
        text: theme.extend.colors.white,
        border: theme.extend.colors.neutral
    },
};


const Navigation = ({}) => {

    const Tab = createBottomTabNavigator();

    const Stack = createStackNavigator();

    const {user} = useUser()

    return (
        <NavigationContainer theme={FinanceerTheme}>
            <FlashMessage position="top"/>
            <Tab.Screen name={"as"} component={LoginScreen}/>

            {user ?
                <Tab.Navigator>
                    <Tab.Screen
                        name="HomeScreen" component={HomeStackScreen} options={{
                        headerShown: false,
                        title: 'Home',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="home" color={color} size={size}/>
                        ),
                    }}/>
                    <Tab.Screen name="TransactionsStack" component={TransactionsStackScreen} options={{
                        headerShown: false,
                        title: 'Transactions',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="stats-chart" color={color} size={size}/>
                        ),

                    }}/>
                    <Tab.Screen name="CategoriesStack" component={CategoriesStackScreen} options={{
                        headerShown: false,
                        title: 'Categories',
                        tabBarIcon: ({color, size}) => (
                            <Ionicons name="ellipsis-horizontal" color={color} size={size}/>
                        ),
                    }}/>
                </Tab.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} options={{title: ''}}/>
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

const HomeStackScreen = () => {

    const HomeStack = createStackNavigator();

    return <HomeStack.Navigator>

        <HomeStack.Screen
            name={routes.home}
            options={{headerShown: false}}
            component={HomeScreen}

        />
        <HomeStack.Screen
            options={({ route }) => ({ title: `Add ${capitalize(route.params.transactionType)}` })}
            name={routes.addTransaction}
            component={AddTransactionScreen}
        />

        <HomeStack.Screen
            name={routes.calendar}
            options={{title: ''}}
            component={CalendarScreen}
        />

        <HomeStack.Screen
            name={routes.profile}
            options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push'
            }}
            component={ProfileScreen}
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

const CategoriesStackScreen = () => {
    const CategoriesStack = createStackNavigator();

    return <CategoriesStack.Navigator>

        <CategoriesStack.Screen
            name={routes.manageCategories}
            component={CategoriesScreen}
        />

        <CategoriesStack.Screen
            name={routes.editCategory}
            component={EditCategoryScreen}
        />

    </CategoriesStack.Navigator>
}

export default Navigation
