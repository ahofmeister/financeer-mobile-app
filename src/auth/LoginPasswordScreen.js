import React, {useState} from "react";
import {View} from "react-native";
import supabase from "supabase";
import FinanceerInput from "components/FinanceerInput";
import {showMessage} from "react-native-flash-message";
import FinanceerText from "components/FinanceerText";
import {routes} from "routes";
import {useNavigation} from "@react-navigation/native";
import FinanceerButton from "components/FinanceerButton";
import {TouchableOpacity} from "react-native-gesture-handler";

const LoginPasswordScreen = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigation = useNavigation();

    const login = async (email, password) => {
        if (!email) {
            showMessage({
                message: "Email is required",
                type: "danger"
            })
            return
        }

        const result = await supabase.auth.signInWithPassword(
            {
                email,
                password
            },
        );

        if (result.error) {
            showMessage({description: result.error.message, message: "Could not login", type: "danger"})
        }
    };

    return (
        <>
            <View className={"w-full"}>
                <View className={"ml-10"}>
                    <FinanceerInput className={"w-72"}
                                    value={email}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    placeholder="Email"
                                    onChangeText={setEmail}/>

                    <FinanceerInput className={"w-72"}
                        value={password}
                        autoCapitalize="none"
                        secretTextEntry={true}
                        placeholder="Password"
                        onChangeText={setPassword}
                    />

                </View>

                <FinanceerButton classNames={"mx-auto w-24"} onPress={() => login(email, password)} label={"Login"}/>

                <TouchableOpacity className={"mx-auto"}
                                  onPress={() => navigation.navigate(routes.login.loginMagicLink)}>
                    <FinanceerText className={"text-primary mt-5"}>
                        Tired of using password? Use Magic Link
                    </FinanceerText>
                </TouchableOpacity>

            </View>
        </>
    )

}

export default LoginPasswordScreen
