import FinanceerText from "components/FinanceerText";
import DefaultLayout from "Layout/DefaultLayout";
import {deleteCategory, fetchParentCategories, upsertCategory} from "api/backend";
import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {showMessage} from "react-native-flash-message";
import {isForeignKeyViolation} from "api/error/ErrorUtil";
import Ionicons from "react-native-vector-icons/Ionicons";
import FinanceerInput from "components/FinanceerInput";
import {theme} from "../../tailwind.config";
import FinanceerButton from "components/FinanceerButton";
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
        fetchParentCategories().then(categories => setCategories(categories))
    }, [editCategory])

    const handleSave = (category) => {
        upsertCategory(category?.id || undefined, category.name).then(response => {
            if (response.status === 201) {
                showMessage({type: 'success', message: `Category successfully ${category.id ? 'updated' : 'created'}`})
                setCategories(...categories, category)
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
                <FinanceerButton label={"Save"} onPress={() => handleSave(editCategory)}/>
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
                className={`flex-row items-center p-2 mt-1 border-gray border-t ${isEnd ? 'border-b' : ''}`}>
                <TouchableOpacity className={"w-10"} onPress={() => {
                    deleteCategory(item.id).then(error => handleError(error))
                    fetchParentCategories().then(categories => setCategories(categories))
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
