import {fetchCategories} from "api/backend";
import {ScrollView, View} from "react-native";
import FinanceerText from "components/FinanceerText";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useEffect, useRef, useState} from "react";
import FinanceerBottomSheet from "components/FinanceerBottomSheet";
import CategoryBreadcrumb from "categories/CategoryBreadcrumb";

const transformToParentChildren = (items, id = null) =>
    items
        .filter(item => item['parent_id'] === id)
        .map(item => ({...item, children: transformToParentChildren(items, item.id)}));


const CategoryPicker = ({onSave, initialCategory}) => {

    const [allCategories, setAlLCategories] = useState([])
    const [currentCategories, setCurrentCategories] = useState([])
    const [parents, setParents] = useState([])

    const bottomSheetRef = useRef(null)
    const [currentCategory, setCurrentCategory] = useState(initialCategory)

    useEffect(() => {
        fetchCategories().then(data => {
            setAlLCategories(transformToParentChildren(data));
        })
    }, [])

    const reset = () => {
        setCurrentCategories(allCategories)
        setParents([])
    }

    const CategoryBox = ({category}) =>
        <View className={"w-1/3 h-20 border-gray border"}>
            <TouchableOpacity className={"h-full justify-center"} onPress={() => {
                if (category.children.length !== 0) {
                    setCurrentCategories(category.children)
                    setParents([...parents, category])
                } else {
                    setCurrentCategory(category)
                    bottomSheetRef.current.close()
                    onSave(category)
                    reset()
                }
            }}>
                <FinanceerText className={"w-full text-center"}>{category.name}</FinanceerText>
            </TouchableOpacity>
        </View>

    return <View className={"mt-5 flex-row"}>
        <FinanceerBottomSheet intRef={bottomSheetRef}>
            <View className={"flex-row ml-3 mb-4"}>
                <CategoryBreadcrumb onStartClick={reset} categories={parents} onCategoryClick={parent => () => {
                    setCurrentCategories(parent.children)
                    setParents(takeUntilInclusive(parents, (category) => category.id === parent.id))
                }}/>
            </View>

            <ScrollView className={"bg-neutral"}>
                <View className={"flex-row flex-wrap"}>
                    {currentCategories?.map((category) => <CategoryBox key={category.id} category={category}/>)}
                </View>
            </ScrollView>
        </FinanceerBottomSheet>

        <View>
            <TouchableOpacity onPress={() => {
                bottomSheetRef.current.present()
                setCurrentCategories(allCategories)
            }}>
                <FinanceerText>Category</FinanceerText>
                <View className={"mt-1 h-10"}>
                    <FinanceerText>{currentCategory?.name}</FinanceerText>
                </View>
            </TouchableOpacity>
        </View>
    </View>
}

const takeUntilInclusive = (array, fn) => {
    for (const [i, val] of array.entries()) if (fn(val)) return array.slice(0, i + 1);
    return array;
}

export default CategoryPicker
