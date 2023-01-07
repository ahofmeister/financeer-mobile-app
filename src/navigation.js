import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {routes} from "routes";
import {createStackNavigator} from "@react-navigation/stack";
import {theme} from "../tailwind.config";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "HomeScreen/HomeScreen";
import FlashMessage from "react-native-flash-message";
import React from "react";
import LoginScreen from "auth/LoginScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useUser} from "auth/AuthContext";
import AddTransactionScreen from "transactions/AddTransactionScreen";
import {capitalize} from "StringUtils";
import CalendarScreen from "transactions/CalendarScreen";
import ProfileScreen from "profile/ProfileScreen";
import ChooseCategoryScreen from "transactions/CategoryScreen";
import TransactionsScreen from "transactions/TransactionsScreen";
import CategoriesScreen from "categories/CategoriesScreen";
import {View} from "react-native";


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

    const CustomIcon = ({focused, name, color, size}) => {
        return <View className={`w-full pt-1 items-center border-t-2 ${focused ? 'border-t-primary' : ''}`}>
            <Ionicons name={name} color={color} size={size}/>
        </View>
    }

    return (
        <NavigationContainer theme={FinanceerTheme}>
            <Tab.Screen name={"as"} component={LoginScreen}/>

            {user ?
                <Tab.Navigator>
                    <Tab.Screen
                        name="HomeScreen" component={HomeStackScreen} options={{
                        headerShown: false,
                        title: 'Home',
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="home" focused={focused} color={color} size={size}/>
                        ),
                    }}/>
                    <Tab.Screen name="TransactionsStack" component={TransactionsStackScreen} options={{
                        headerShown: false,
                        title: 'Transactions',
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="stats-chart" focused={focused} color={color} size={size}/>
                        ),

                    }}/>
                    <Tab.Screen name="CategoriesStack" component={CategoriesStackScreen} options={{
                        headerShown: false,
                        title: 'Categories',
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="ellipsis-horizontal" focused={focused} color={color} size={size}/>
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
            options={({route}) => ({title: `Add ${capitalize(route.params.transactionType)}`})}
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
            options={{title: 'Choose Category'}}
            component={ChooseCategoryScreen}
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
            options={{headerShown: true}}
            component={CategoriesScreen}
        />

    </CategoriesStack.Navigator>
}

export default Navigation
