import React, {useState} from "react";
import {Pressable, View} from "react-native";
import supabase from "supabase";
import FinanceerInput from "components/FinanceerInput";
import {showMessage} from "react-native-flash-message";
import FinanceerText from "components/FinanceerText";
import {routes} from "routes";
import {useNavigation} from "@react-navigation/native";
import Button from "components/Button";

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

        let result = await supabase.auth.signInWithPassword(
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
            <View className={"items-center w-5/6 mx-auto"}>
                <FinanceerInput className={"w-3/4 mx-auto"}
                                value={email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="Email"
                                onChangeText={setEmail}/>


                <FinanceerInput className={"w-3/4 mx-auto"}
                                value={password}
                                autoCapitalize="none"
                                keyboardType="password"
                                placeholder="Password"
                                onChangeText={setPassword}
                />


                <Button classNames={"mx-auto w-24"} onPress={() => login(email, password)} label={"Login"}/>

                <Pressable className={"mx-auto"}
                           onPress={() => navigation.navigate(routes.login.loginMagicLink)}>
                    <FinanceerText className={"text-primary mt-5"}>
                        Tired of using password? Use Magic Link
                    </FinanceerText>
                </Pressable>

            </View>
        </>
    )

}

export default LoginPasswordScreen
