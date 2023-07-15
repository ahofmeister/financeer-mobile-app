import {View} from "react-native";
import supabase from "supabase";
import FinanceerText from "components/FinanceerText";
import {useUser} from "auth/AuthContext";
import {TouchableOpacity} from "react-native-gesture-handler";

const ProfileScreen = () => {

    const pkg = require('../../package.json');

    const user = useUser()

    if (!user) {
        return <FinanceerText>Not logged in</FinanceerText>
    }

    return <>
        <View className={"my-20 mx-auto justify-center"}>
            <FinanceerText className={"text-sm"}>{user.user.email}</FinanceerText>
        </View>

        <View className={"h-10 my-20 mx-auto justify-center w-11/12 bg-primary rounded"}>
            <TouchableOpacity onPress={() => supabase.auth.signOut()}><FinanceerText
                className={"text-center"}>Logout</FinanceerText></TouchableOpacity>
        </View>

        <FinanceerText className={"mb-10 justify-center mx-auto"}>Version: {pkg.version}</FinanceerText>
    </>
}

export default ProfileScreen
