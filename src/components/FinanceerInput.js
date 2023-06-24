import {TextInput, View} from "react-native";
import FinanceerText from "components/FinanceerText";
import {theme} from "../../tailwind.config";

const FinanceerInput = (props) => {
    return <>
        <View className={"h-20 w-52"}>
            <FinanceerText>{props.label}</FinanceerText>
            <TextInput placeholderTextColor={"#999"} selectionColor={theme.extend.colors.primary}
                       {...props}
                       className={'pl-2 text-white h-10 border-b-1 border-b-gray rounded focus:border-primary' + (props.className || '')}>
            </TextInput>
        </View>
    </>
}

export default FinanceerInput




