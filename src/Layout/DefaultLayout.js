import {View} from "react-native";

export const DefaultLayout = ({children}) => {
    return <View className={"mt-5 h-full"}>
        {children}
    </View>

}

export default DefaultLayout
