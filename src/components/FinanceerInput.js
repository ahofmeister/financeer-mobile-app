import {TextInput} from "react-native";
import FinanceerText from "components/FinanceerText";
import {theme} from "../../tailwind.config";

const FinanceerInput = (props) => {
    return <>
        <FinanceerText>{props.label}</FinanceerText>
        <TextInput placeholderTextColor={"#FFF"} selectionColor={theme.extend.colors.primary}
                   {...props}
                   className={'w-full pl-2 text-white h-10 border-b-1 border-b-gray rounded focus:border-primary' + (props.className || '')}>
        </TextInput>
    </>
}

export default FinanceerInput




