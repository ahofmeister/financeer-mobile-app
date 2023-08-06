import {View} from "react-native";
import React from "react";
import FinanceerText from "components/FinanceerText";
import {TouchableOpacity} from "react-native-gesture-handler";

const FinanceerButton = ({label, onPress, classNames}) => {
    return <View className={`bg-primary h-10 flex justify-center rounded-md ${classNames}`}>
        <TouchableOpacity onPress={onPress}>
            <FinanceerText className={"font-bold text-center"}>{label}</FinanceerText>
        </TouchableOpacity>
    </View>

}
export default FinanceerButton
