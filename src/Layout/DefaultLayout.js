import {View} from "react-native";

export const DefaultScreen = ({children}) => {
    return <View className={"m-5 h-full"}>
        {children}
    </View>

}

export default DefaultScreen