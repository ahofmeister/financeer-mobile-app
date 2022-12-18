import DefaultLayout from "Layout/DefaultLayout";
import FinanceerInput from "components/FinanceerInput";
import {Button} from "react-native";
import {useState} from "react";
import {upsertCategory} from "api/backend";
import {showMessage} from "react-native-flash-message";
import {useNavigation} from "@react-navigation/native";
import {routes} from "routes";


const EditCategoryScreen = ({route}) => {
    const navigation = useNavigation();

    const handleSave = (category, name) => {
        let {error} = upsertCategory(category?.id || undefined, name);

        if (!error) {
            navigation.navigate(routes.manageCategories)
            showMessage({
                    message: "Category saved",
                    type: 'success',
                }
            );
        }
    };

    const category = route.params.category;

    const [name, setName] = useState(category && category?.name || '')

    return <DefaultLayout>
        <FinanceerInput label={"Name"} value={name} onChangeText={setName}/>

        <Button title={"Save"} onPress={() => handleSave(category, name)}></Button>
    </DefaultLayout>

}
export default EditCategoryScreen