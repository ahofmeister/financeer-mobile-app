import {Pressable, View} from "react-native";
import React from "react";
import FinanceerText from "components/FinanceerText";

const Button = ({label, onPress, classNames}) => {
    return <View className={`bg-primary h-10 flex justify-center rounded-md ${classNames}`}>
        <Pressable onPress={onPress}>
            <FinanceerText className={"font-bold text-center items"}>{label}</FinanceerText>
        </Pressable>
    </View>

}
export default Button
