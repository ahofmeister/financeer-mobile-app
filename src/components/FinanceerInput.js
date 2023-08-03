import {TextInput, View} from "react-native";
import FinanceerText from "components/FinanceerText";
import {theme} from "../../tailwind.config";

const FinanceerInput = (props) => {
    return <>
        <View className={`w-52 h-20 ${props.className}`}>
            <FinanceerText>{props.label}</FinanceerText>
            <TextInput placeholderTextColor={"#999"} selectionColor={theme.extend.colors.primary} secureTextEntry={props.secretTextEntry}
                       {...props}
                       className={'pl-2 text-white h-10 border-b-1 border-b-gray rounded focus:border-primary' + (props.className || '')}>
            </TextInput>
        </View>
    </>
}

export default FinanceerInput




