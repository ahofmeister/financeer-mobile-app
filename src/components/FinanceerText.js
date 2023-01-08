import {Text} from "react-native";

const FinanceerText = (props) => {
    return <Text {...props} className={'text-white' + (props.className || '')}>
        {props.children}
    </Text>;
}

export default FinanceerText
