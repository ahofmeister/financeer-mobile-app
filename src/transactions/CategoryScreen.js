import {Pressable, View} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {fetchCategories} from "api/backend";
import FinanceerText from "components/FinanceerText";
import {routes} from "routes";


const CategoryScreen = ({route}) => {
    const callback = route.params.callback
    const transactionType = route.params.transactionType

    const navigation = useNavigation()
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then(response => {
            setCategories(response.map((item) => ({id: item.id, name: item.name})))
        })

    }, [])

    return <>
        <View className={"flex-row flex-wrap align-text-bottom"}>
            {categories.map((item) => {

                return <View className={"w-1/3 border-gray border-1 h-20 justify-center"}>
                    <Pressable onPress={() => {
                        callback(item)
                        return navigation.navigate(routes.addTransaction, {
                            transactionType
                        });
                    }}>
                        <FinanceerText
                            className={"w-full text-center"}>{item.name}</FinanceerText>
                    </Pressable>
                </View>
            })}
        </View>
    </>

}
export default CategoryScreen
