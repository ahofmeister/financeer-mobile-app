import {DefaultTheme, NavigationContainer, useNavigation} from "@react-navigation/native";
import {routes} from "routes";
import {createStackNavigator} from "@react-navigation/stack";
import {theme} from "../tailwind.config";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import LoginScreen from "auth/LoginScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useUser} from "auth/AuthContext";
import {capitalize} from "StringUtils";
import CalendarScreen from "transactions/CalendarScreen";
import ChooseCategoryScreen from "transactions/CategoryScreen";
import TransactionsScreen from "transactions/TransactionsScreen";
import {Pressable, View} from "react-native";
import TransactionView from "transactions/TransactionView";
import CategoriesScreen from "categories/CategoriesScreen";
import FinanceerText from "components/FinanceerText";


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
            {user ?
                <Tab.Navigator screenOptions={{
                    tabBarHideOnKeyboard: true
                }}>
                    <Tab.Screen name="TransactionsStack" component={TransactionsStackScreen} options={{
                        headerShown: false,
                        title: 'Transactions',
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="stats-chart" focused={focused} color={color} size={size}/>
                        )

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

const TransactionsStackScreen = () => {
    const TransactionsStack = createStackNavigator();
    const navigation = useNavigation();

    return <TransactionsStack.Navigator screenOptions={{
        headerStyle: {
            borderBottomColor: theme.extend.colors.primary,
            borderBottomWidth: 1
        }
    }}>

        <TransactionsStack.Screen
            name={routes.transactions}
            component={TransactionsScreen} options={{
            headerRight: () => {
                return <Pressable
                    className={"self-right"}
                    onPress={() => navigation.navigate(routes.transaction)}>
                    <FinanceerText className={""}>
                        <Ionicons name={"add"} color={theme.extend.colors.primary} size={30}/>
                    </FinanceerText>
                </Pressable>
            }
        }}
        />

        <TransactionsStack.Screen
            options={({route}) => ({ title: `${capitalize('Expense')}`, tabBarStyle: { display: "" }})}
            name={routes.transaction}
            component={TransactionView}
        />

        <TransactionsStack.Screen
            name={routes.calendar}
            options={{title: ''}}
            component={CalendarScreen}
        />

        <TransactionsStack.Screen
            name={routes.categories}
            options={{title: 'Choose Category'}}
            component={ChooseCategoryScreen}
        />

    </TransactionsStack.Navigator>
}


const CategoriesStackScreen = () => {
    const CategoriesStack = createStackNavigator();

    return <CategoriesStack.Navigator screenOptions={{
        headerStyle: {
            borderBottomColor: theme.extend.colors.primary,
            borderBottomWidth: 1
        }
    }}>

        <CategoriesStack.Screen
            name={routes.manageCategories}
            options={{headerShown: true}}
            component={CategoriesScreen}
        />

    </CategoriesStack.Navigator>
}

export default Navigation

const CustomIcon = ({focused, name, color, size}) => {
    return <View className={`w-full pt-1 items-center border-t-1 ${focused ? 'border-t-primary' : ''}`}>
        <Ionicons name={name} color={color} size={size}/>
    </View>
}

