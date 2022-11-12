import {View} from "react-native";

export const DefaultLayout = ({children}) => {
    return <View className={"mt-3 mx-5 h-full"}>
        {children}
    </View>

}

export default DefaultLayout