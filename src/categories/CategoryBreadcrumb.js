import {TouchableOpacity} from "react-native-gesture-handler";
import FinanceerText from "components/FinanceerText";
import {View} from "react-native";

const Breadcrumb = ({categories, onClick}) => <>
    {categories?.map((parent, index) =>
        <View key={parent.id} className={"flex-row"}>
            <FinanceerText className={"text-primary"}> > </FinanceerText>
            <TouchableOpacity onPress={onClick(parent)}>
                <FinanceerText className={"text-primary"}>{parent.name}</FinanceerText>
            </TouchableOpacity>
        </View>
    )}
</>

const BreadcrumbStart = ({onPress}) =>
    <TouchableOpacity onPress={onPress}>
        <FinanceerText className={"text-primary"}>Categories</FinanceerText>
    </TouchableOpacity>;


const CategoryBreadcrumb = ({onStartClick, categories, onCategoryClick}) =>
    <>
        <BreadcrumbStart onPress={onStartClick}/>
        <Breadcrumb categories={categories} onClick={onCategoryClick}/>
    </>
export default CategoryBreadcrumb


