import {TextInput} from "react-native";
import FinanceerText from "components/FinanceerText";
import {theme} from "../../tailwind.config";

const FinanceerInput = (props) => {
    return <>
        <FinanceerText>{props.label}</FinanceerText>
        <TextInput placeholderTextColor={"#FFF"} selectionColor={theme.extend.colors.primary}
                   {...props}
                   className={'pl-2 bg-neutral text-white h-10 border-b-1 rounded focus:border-primary' + (props.className || '')}>
        </TextInput>
    </>
}

export default FinanceerInput




