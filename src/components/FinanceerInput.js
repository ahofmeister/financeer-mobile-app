import {TextInput} from "react-native";
import FinanceerText from "components/FinanceerText";

const FinanceerInput = (props) => {
    return <>
        <FinanceerText>{props.label}</FinanceerText>
        <TextInput
            {...props}
            className={'bg-secondary border-secondary text-white h-10 border-2 rounded focus:border-primary' + (props.className || '')}>
        </TextInput>
    </>
}

export default FinanceerInput




