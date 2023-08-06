import {View} from "react-native";

export const DefaultLayout = ({children}) => {
    return <View className={"h-full"}>
        {children}
    </View>

}

export default DefaultLayout
