import {View} from "react-native";
import supabase from "supabase";
import FinanceerText from "components/FinanceerText";
import {useUser} from "auth/AuthContext";
import {TouchableOpacity} from "react-native-gesture-handler";
import {getProfile} from "api/backend";
import {useEffect, useState} from "react";

const Version = () => {
    const pkg = require('../../package.json');
    return <FinanceerText className={"mb-10 justify-center mx-auto"}>Version: {pkg.version}</FinanceerText>
};

const ProfileScreen = () => {

    const {user} = useUser()

    const [profile, setProfile] = useState()

    useEffect(() => {
        getProfile().then(setProfile)
    }, [])

    if (!user) {
        return <FinanceerText>Not logged in</FinanceerText>
    }

    return <>
        <View className={"m-5"}>
            <View className={"h-16 justify-center bg-gray mb-2"}>
                <View className={"m-3"}>
                    <FinanceerText className={"text-lg  mb-1"}>Name</FinanceerText>
                    <FinanceerText>{profile?.firstName} {profile?.lastName}</FinanceerText>
                </View>
            </View>

            <View className={"h-16  justify-center bg-gray"}>
                <View className={"m-3"}>
                    <FinanceerText className={"text-lg mb-1"}>Email</FinanceerText>
                    <FinanceerText>{user.email}</FinanceerText>
                </View>
            </View>

            <View className={"h-10 my-20 mx-auto justify-center w-11/12 bg-primary rounded"}>
                <TouchableOpacity onPress={() => supabase.auth.signOut()}><FinanceerText
                    className={"text-center"}>Logout</FinanceerText></TouchableOpacity>
            </View>

            <Version/>
        </View>
    </>
}

export default ProfileScreen
