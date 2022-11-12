import FinanceerText from "components/FinanceerText";
import DefaultLayout from "Layout/DefaultLayout";
import {deleteCategory, fetchCategories} from "api/backend";
import {useEffect, useState} from "react";
import {FlatList, Pressable, View} from "react-native";
import {showMessage} from "react-native-flash-message";
import {isForeignKeyViolation} from "api/error/ErrorUtil";

function handleError(error) {

    if (isForeignKeyViolation(error)) {
        return showMessage({
                message: "Error",
                description: 'The category cannot be deleted, because it is already used',
                type: 'danger'
            }
        );
    }
}

const CategoriesScreen = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories().then(categories => setCategories(categories))
    }, [])

    return <DefaultLayout><FinanceerText>
        <FlatList data={categories} renderItem={({item}) => {
            return <View className={"flex-row w-full justify-between"}>
                <FinanceerText>{item.name}</FinanceerText>
                <View className={"flex-row"}>
                    <FinanceerText className={"text-primary mx-5"}>Edit</FinanceerText>
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