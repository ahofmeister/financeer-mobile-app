import {Text} from "react-native";

const FinanceerText = (props) => {
    return <Text style={props.style} className={'text-white text-lg' + (props.className || '')}>
        {props.children}
    </Text>;
}

export default FinanceerText