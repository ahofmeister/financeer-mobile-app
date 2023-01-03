import {Pressable, ScrollView, View} from "react-native";
import {useState} from "react";
import {createTransaction} from "api/backend";
import {useNavigation} from "@react-navigation/native";
import {theme} from "../../tailwind.config";
import {format} from "date-fns";
import FinanceerText from "components/FinanceerText";
import {routes} from "routes";
import DefaultLayout from "Layout/DefaultLayout";
import FinanceerInput from "components/FinanceerInput";

const AddTransactionScreen = () => {
    const navigation = useNavigation()

    const [amount, setAmount] = useState()
    const [description, setDescription] = useState('')
    const [type, setType] = useState('EXPENSE')
    const [date, setDate] = useState(new Date())
    const [category, setCategory] = useState()

    return <DefaultLayout>
        <ScrollView className={"mt-0    "}>
            <View className={"flex-row justify-center justify-around"}>
                <Pressable onPress={() => setType('EXPENSE')}
                           style={{backgroundColor: theme.extend.colors.expense}}
                           className={(type === 'EXPENSE' ? '' : 'opacity-40') + " w-40 rounded"}>
                    <FinanceerText className={"uppercase font-bold text-center"}>expense</FinanceerText>
                </Pressable>

                <Pressable onPress={() => setType('INCOME')}
                           style={{backgroundColor: theme.extend.colors.income}}
                           className={(type === 'INCOME' ? '' : 'opacity-40') + " w-40 rounded"}>
                    <FinanceerText className={"uppercase font-bold text-center"}>income</FinanceerText>
                </Pressable>
            </View>

            <View className={"mt-5"}>
                <FinanceerInput
                    label={"Amount"}
                    className={"mt-1 text-white h-10 border-2 rounded focus:border-primary"}
                    keyboardType={'phone-pad'}
                    placeholderTextColor="white"
                    value={amount}
                    onChangeText={setAmount}
                />
                <View className={"mt-5"}>
                    <FinanceerInput label={"Description"}
                                    className={"mt-1 text-white h-10 border-2 rounded focus:border-primary"}
                                    placeholderTextColor="white"
                                    value={description}
                                    onChangeText={setDescription}
                    />
                </View>
            </View>
            <View className={"mt-5"}>
                <FinanceerText>Date</FinanceerText>
                <Pressable onPress={() => navigation.navigate(routes.calendar, {
                    callback: setDate,
                    date
                })}>
                    <View
                        className={"mt-1 text-white h-10 border-2 rounded focus:border-primary"}>
                        <FinanceerText>{format(date, 'dd.MM.yyyy')}</FinanceerText>
                    </View>
                </Pressable>
            </View>

            <View className={"mt-5"}>
                <FinanceerText>Category</FinanceerText>
                <Pressable onPress={() => navigation.navigate(routes.categories, {
                    callback: setCategory,
                    initialCategory: category
                })}>
                    <View
                        className={"mt-1 h-10"}>
                        <FinanceerText>{category?.name}</FinanceerText>
                    </View>
                </Pressable>
            </View>

            <Pressable
                className={"bg-secondary rounded text-center mt-10"}
                onPress={async () => {
                    await createTransaction(amount, type, date.toISOString(), description, category.id)
                    navigation.navigate(routes.home)
                }}>
                <FinanceerText className={"text-center bg-primary font-bold"}>Add</FinanceerText>
            </Pressable>
        </ScrollView>
    </DefaultLayout>

};

export default AddTransactionScreen
