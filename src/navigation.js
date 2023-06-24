import {DefaultTheme, NavigationContainer, useNavigation} from "@react-navigation/native";
import {routes} from "routes";
import {createStackNavigator} from "@react-navigation/stack";
import {theme} from "../tailwind.config";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import LoginMagicLinkScreen from "auth/LoginMagicLinkScreen";
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
import ProfileScreen from "profile/ProfileScreen";
import LoginPasswordScreen from "auth/LoginPasswordScreen";
import {WelcomeScreen} from "auth/WelcomeScreen";
import {RegisterScreen} from "auth/RegisterScreen";


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

                    {/*<Tab.Screen name="Pay" component={TransactionsScreen} options={{*/}
                    {/*    tabBarButton: () => (<CreateTransactionButton/>),*/}
                    {/*}}/>*/}

                    <Tab.Screen name="Placeholder" component={ProfileStack} options={{
                        title: 'Placeholder',
                        headerShown: false,
                        tabBarIcon: ({focused, color, size}) => (
                            <CustomIcon name="person" focused={focused} color={color} size={size}/>
                        ),
                    }}/>


                    <Tab.Screen name="Profile" component={ProfileStack} options={{
                        title: 'Profile',
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

const CreateTransactionButton = () => {
    const navigation = useNavigation();
    return <Pressable onPress={() => navigation.navigate(routes.transaction, {})}>
        <View
            className={'w-11 h-11 mt-2 justify-center  self-center aspect-square rounded-full border-primary border-1'}>

            <Ionicons name={"add"} size={44} color={theme.extend.colors.primary}
                      className={""}></Ionicons>

        </View>
    </Pressable>
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
                    <FinanceerText>
                        <Ionicons name={"add"} color={theme.extend.colors.primary} size={30}/>
                    </FinanceerText>
                </Pressable>
            }
        }}
        />

        <TransactionsStack.Screen
            options={({route}) => ({title: `${capitalize('Expense')}`, tabBarStyle: {display: ""}})}
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


const ProfileStack = () => {
    const ProfileStack = createStackNavigator();

    return <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            borderBottomColor: theme.extend.colors.primary,
            borderBottomWidth: 1
        }
    }}>

        <ProfileStack.Screen
            name={routes.profile}
            component={ProfileScreen}
        />

    </ProfileStack.Navigator>
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

