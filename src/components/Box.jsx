import FinanceerText from "components/FinanceerText";
import {TouchableOpacity} from "react-native-gesture-handler";
import {View} from "react-native";

const Box = ({label, onPress}) =>
    <View className={"h-20 border-gray border w-1/3"}>
        <TouchableOpacity onPress={onPress}>
            <View className={"h-full justify-center"}>
                <FinanceerText className={"text-center"}>{label}</FinanceerText>
            </View>
        </TouchableOpacity>
    </View>

export default Box
