import FinanceerText from "components/FinanceerText";
import DefaultLayout from "Layout/DefaultLayout";
import {deleteCategory, fetchCategories, upsertCategory} from "api/backend";
import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {showMessage} from "react-native-flash-message";
import {isForeignKeyViolation} from "api/error/ErrorUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import FinanceerInput from "components/FinanceerInput";
import {theme} from "../../tailwind.config";
import Button from "components/Button";
import {TouchableOpacity} from "react-native-gesture-handler";

const handleError = error => {
    if (isForeignKeyViolation(error)) {
        return showMessage({
                message: "Error",
                description: 'The category cannot be deleted, because it is still in use',
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
        upsertCategory(category?.id || undefined, category.name).then(response => {
            if (response.data) {
                showMessage({type: 'success', message: `Category successfully ${category.id ? 'updated' : 'created'}`})
                setCategories(...categories, response.data[0])
                setEditCategory(undefined)
            }
        })

    }

    if (editCategory) {
        return <DefaultLayout>
            <TouchableOpacity className={"items-end mr-3"}
                       onPress={() => setEditCategory(undefined)}>
                <Ionicons color={'white'} name="close-outline" size={35}/>
            </TouchableOpacity>

            <FinanceerInput className={"w-11/12 mx-auto"} autoFocus value={editCategory.name} onChangeText={(text) => {
                setEditCategory({
                    ...editCategory,
                    name: text
                })
            }
            }/>

            <View className={"mt-10"}>
                <Button label={"Save"} onPress={() => handleSave(editCategory, editCategory)}/>
            </View>
        </DefaultLayout>
    }

    return <DefaultLayout>
        <View className={"flex-row justify-between my-2"}>
            <FinanceerText className={"ml-3"}>{categories.length} total</FinanceerText>
            <TouchableOpacity className={"mr-3"} onPress={() => setEditCategory({
                name: ''
            })}>
                <Ionicons name={"add-circle"} color={theme.extend.colors.primary} size={30}/>
            </TouchableOpacity>
        </View>

        <FlatList className={"mb-5"} data={categories} renderItem={({item, index}) => {
            const isEnd = index === categories.length - 1;

            return <View
                className={`flex-row items-center p-2 mt-1 border-gray border-t-1 ${isEnd ? 'border-b-1' : ''}`}>
                <TouchableOpacity className={"w-10"} onPress={() => {
                    deleteCategory(item.id).then(error => handleError(error))
                    fetchCategories().then(categories => setCategories(categories))
                }}>
                    <Ionicons name={"trash"} size={20} color={theme.extend.colors.expense}/>
                </TouchableOpacity>
                <FinanceerText className={"flex-1"}>{item.name}</FinanceerText>
                <View className={""}>
                    <TouchableOpacity className={"mr-5"} onPress={() => setEditCategory(item)}>
                        <Ionicons name={"pencil"} size={20} color={theme.extend.colors.income}/>
                    </TouchableOpacity>
                </View>
            </View>
        }
        }/>

    </DefaultLayout>

}
export default CategoriesScreen
