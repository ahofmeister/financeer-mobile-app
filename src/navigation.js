import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {routes} from "routes";
import {createStackNavigator} from "@react-navigation/stack";
import {theme} from "../tailwind.config";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import LoginMagicLinkScreen from "auth/LoginMagicLinkScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useUser} from "auth/AuthContext";
import ChooseCategoryScreen from "transactions/CategoryScreen";
import HomeScreen from "HomeScreen";
import {View} from "react-native";
import TransactionView from "transactions/TransactionView";
import CategoriesScreen from "categories/CategoriesScreen";
import ProfileScreen from "profile/ProfileScreen";
import LoginPasswordScreen from "auth/LoginPasswordScreen";
import {RegisterScreen} from "auth/RegisterScreen";
import {WelcomeScreen} from "auth/WelcomeScreen";
import StatsScreen from "statistics/StatsScreen";
import TransactionsByCategoryScreen from "statistics/TransactionsByCategoryScreen";


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
    ;
    return (
        <NavigationContainer theme={FinanceerTheme}>
            {user ?
                <Tab.Navigator screenOptions={{
                    tabBarHideOnKeyboard: true
                }}>
                    <Tab.Screen name="TransactionsStack" component={TransactionsStackScreen} options={{
                        headerShown: false,
                        unmountOnBlur: true,
                        title: 'Home',
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="home" focused={focused} color={color} size={size}/>
                        )
                    }}/>

                    <Tab.Screen name="NewStack" component={CreateTransactionStackScreen} options={{
                        headerShown: false,
                        title: 'Create',
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="add-circle-outline" focused={focused} color={color} size={size}/>
                        )
                    }}/>

                    <Tab.Screen name="CategoriesStack" component={CategoriesStackScreen} options={{
                        headerShown: false,
                        title: 'Categories',
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="ellipsis-horizontal" focused={focused} color={color} size={size}/>
                        ),
                    }}/>

                    <Tab.Screen name="Stats" component={StatsStackScreen} options={{
                        headerShown: false,
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="stats-chart" focused={focused} color={color} size={size}/>
                        ),
                    }}/>


                    <Tab.Screen name="Profile" component={ProfileStack} options={{
                        headerShown: false,
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="person" focused={focused} color={color} size={size}/>
                        ),
                    }}/>


                </Tab.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name={routes.welcome} component={WelcomeScreen} options={{title: ''}}/>
                    <Stack.Screen name={routes.register} component={RegisterScreen} options={{title: ''}}/>
                    <Stack.Screen name="LoginMagicLink" component={LoginMagicLinkScreen}
                                  options={{title: ''}}/>
                    <Stack.Screen name="LoginPassword" component={LoginPasswordScreen}
                                  options={{title: ''}}/>
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

const TransactionsStackScreen = () => {
    const TransactionsStack = createStackNavigator();

    return <TransactionsStack.Navigator>
        <TransactionsStack.Screen
            options={{headerShown: false}}
            name={routes.transactions}
            component={HomeScreen}
        />

        <TransactionsStack.Screen
            name={routes.transaction}
            options={{headerShown: false}}
            component={TransactionView}
        />

        <TransactionsStack.Screen
            name={routes.categories}
            component={ChooseCategoryScreen}
        />

    </TransactionsStack.Navigator>
}


const ProfileStack = () => {
    const ProfileStack = createStackNavigator();

    return <ProfileStack.Navigator>

        <ProfileStack.Screen
            name={routes.profile}
            options={{headerShown: false}}
            component={ProfileScreen}
        />

    </ProfileStack.Navigator>
}

const CategoriesStackScreen = () => {
    const CategoriesStack = createStackNavigator();

    return <CategoriesStack.Navigator>

        <CategoriesStack.Screen
            name={routes.manageCategories}
            options={{headerShown: false}}
            component={CategoriesScreen}
        />

    </CategoriesStack.Navigator>
}


const CreateTransactionStackScreen = () => {
    const CreateTransactionStack = createStackNavigator();

    return <CreateTransactionStack.Navigator>

        <CreateTransactionStack.Screen
            name={routes.transaction}
            options={{headerShown: false}}
            component={TransactionView}
        />

    </CreateTransactionStack.Navigator>
}

const StatsStackScreen = () => {
    const StatsStack = createStackNavigator();

    return <StatsStack.Navigator>

        <StatsStack.Screen
            name={routes.stats}
            options={{headerShown: false}}
            component={StatsScreen}
        />

        <StatsStack.Screen
            name={routes.transactionsByCategory}
            options={{headerShown: false}}
            component={TransactionsByCategoryScreen}
        />

    </StatsStack.Navigator>
}

export default Navigation

const CustomIcon = ({focused, name, color, size}) => {
    return <View className={`w-full pt-1 items-center justify-center border-t ${focused ? 'border-t-primary' : ''}`}>
        <Ionicons name={name} color={color} size={size}/>
    </View>
}

