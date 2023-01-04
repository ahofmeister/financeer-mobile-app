import {FlatList, Pressable, View} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import FinanceerText from "components/FinanceerText";
import {routes} from "routes";
import {fetchCategories} from "api/backend";


const CategoryScreen = ({route}) => {
    const callback = route.params.callback
    const initialCategory = route.params.initialCategory
    const transactionType = route.params.transactionType
    console.log(transactionType)

    const navigation = useNavigation()
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    useEffect(() => {
        fetchCategories().then(response => {
            let newArray = response.map((item) => ({id: item.id, name: item.name}))
            setCategories(newArray)
        })

    }, [])

    return <>

        <View className={"flex h-10 w-5 m-5 ml-auto"}>
            <Pressable onPress={() => navigation.navigate(routes.addTransaction, {
                transactionType
            })}>
                <FinanceerText className={"text-right"}>X</FinanceerText>
            </Pressable>
        </View>

        <View className={"h-2/3"}>
            <FlatList className={"m-5"}
                      data={categories}
                      renderItem={({item}) => {
                          return <Pressable key={item.id} className={"h-14"} onPress={() => setSelectedCategory(item)}>
                              <View className={"flex-row w-full justify-between"}>
                                  <FinanceerText
                                      className={"underline decoration-primary"}>{item.name}</FinanceerText>
                                  {item.name === selectedCategory?.name ? (<FinanceerText
                                      className="text-primary">✓</FinanceerText>) : <></>}
                              </View>
                          </Pressable>
                      }
                      }
                      keyExtractor={item => item.id}
            />
        </View>
        <Pressable onPress={() => {
            callback(selectedCategory)
            return navigation.navigate(routes.addTransaction, {
                transactionType
            });
        }}>
            <FinanceerText
                className={"w-20 mx-auto rounded-3xl text-center font-bold text-primary"}>Done</FinanceerText>
        </Pressable>
    </>

}
export default CategoryScreen
