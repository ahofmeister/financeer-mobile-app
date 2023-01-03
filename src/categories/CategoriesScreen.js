import FinanceerText from "components/FinanceerText";
import DefaultLayout from "Layout/DefaultLayout";
import {deleteCategory, fetchCategories, upsertCategory} from "api/backend";
import {useEffect, useState} from "react";
import {Button, FlatList, Pressable, View} from "react-native";
import {showMessage} from "react-native-flash-message";
import {isForeignKeyViolation} from "api/error/ErrorUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import FinanceerInput from "components/FinanceerInput";

const handleError = error => {
    if (isForeignKeyViolation(error)) {
        console.log(error)
        return showMessage({
                message: "Error",
                description: 'The category cannot be deleted, because it is already used',
                type: 'danger'
            }
        );
    }
};

const CategoriesScreen = () => {

    const [categories, setCategories] = useState([])

    const [editCategory, setEditCategory] = useState();

    useEffect(() => {
        fetchCategories().then(categories => setCategories(categories))
    }, [editCategory])

    const handleSave = (category) => {
        upsertCategory(category?.id || undefined, category.name).then(x => {
            if (x.data) {
                setCategories(...categories, x.data[0])
                setEditCategory(undefined)
            }
        })

    }

    if (editCategory) {
        return <DefaultLayout>
            <FinanceerInput label={"Name"} value={editCategory.name} onChangeText={(text) => {
                setEditCategory({
                    ...editCategory,
                    name: text
                })
            }
            }/>
            <Button title={"Save"} onPress={() => handleSave(editCategory, editCategory)}></Button>

            <Pressable className={"bg-primary w-1/2 mx-auto"}
                       onPress={() => setEditCategory(undefined)}>
                <FinanceerText className={"font-bold text-secondary text-center"}>Cancel</FinanceerText>
            </Pressable>
        </DefaultLayout>
    }

    return <DefaultLayout>


        <Pressable className={"w-1/2 mx-auto"}
                   onPress={() => setEditCategory({
                       name: ''
                   })}>
            <FinanceerText className={"font-bold text-lila text-center"}>Add Category</FinanceerText>
        </Pressable>

        <FlatList data={categories} renderItem={({item}) => {
            return <View className={"flex-row mt-1 w-full justify-between"}>
                <FinanceerText>{item.name}</FinanceerText>
                <View className={"flex-row"}>
                    <Pressable onPress={() => setEditCategory(item)}>
                        <FinanceerText className={"text-primary mx-5"}>
                            <Ionicons name={"pencil"} size={15}/>
                        </FinanceerText>
                    </Pressable>
                    <Pressable onPress={() => {
                        deleteCategory(item.id).then(error => handleError(error))
                        fetchCategories().then(categories => setCategories(categories))
                    }}>
                        <FinanceerText className={"text-primary"}>
                            <Ionicons name={"trash"} size={15}/>
                        </FinanceerText>
                    </Pressable>
                </View>
            </View>
        }
        }/>

    </DefaultLayout>

}
export default CategoriesScreen
