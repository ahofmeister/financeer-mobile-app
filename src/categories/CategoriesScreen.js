import FinanceerText from "components/FinanceerText";
import DefaultLayout from "Layout/DefaultLayout";
import {deleteCategory, fetchCategories} from "api/backend";
import {useEffect, useState} from "react";
import {FlatList, Pressable, View} from "react-native";
import {showMessage} from "react-native-flash-message";
import {isForeignKeyViolation} from "api/error/ErrorUtil";
import {routes} from "routes";
import {useNavigation} from "@react-navigation/native";

const handleError = error => {
    if (isForeignKeyViolation(error)) {
        return showMessage({
                message: "Error",
                description: 'The category cannot be deleted, because it is already used',
                type: 'danger'
            }
        );
    }
};

const CategoriesScreen = () => {

    const navigation = useNavigation();

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories().then(categories => setCategories(categories))
    }, [])

    return <DefaultLayout>

        <Pressable className={"bg-accent w-1/2 mx-auto"}
                   onPress={() => navigation.navigate(routes.editCategory, {category: undefined})}>
            <FinanceerText className={"font-bold text-secondary text-center"}>Add Category</FinanceerText>
        </Pressable>

        <FinanceerText>
            <FlatList data={categories} renderItem={({item}) => {
                return <View className={"flex-row w-full justify-between"}>
                    <FinanceerText>{item.name}</FinanceerText>
                    <View className={"flex-row"}>
                        <Pressable onPress={() => navigation.navigate(routes.editCategory, {category: item})}>
                            <FinanceerText className={"text-primary mx-5"}>Edit</FinanceerText>
                        </Pressable>
                        <Pressable onPress={() => deleteCategory(item.id).then(error => handleError(error)
                        )}>
                            <FinanceerText className={"text-accent"}>X</FinanceerText>
                        </Pressable>
                    </View>
                </View>
            }
            }/>

        </FinanceerText></DefaultLayout>

}
export default CategoriesScreen