import {View} from "react-native";
import FinanceerInput from "components/FinanceerInput";
import React, {useState} from "react";
import {showMessage} from "react-native-flash-message";
import supabase from "supabase";
import Button from "components/Button";

export const RegisterScreen = ({navigation}) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [sending, setSending] = useState(false)

    const signUp = async () => {
        if (!email) {
            showMessage({
                message: "Email is required",
                type: "danger"
            })
            return
        }
        if (!password) {
            showMessage({
                message: "Password is required",
                type: "danger"
            })
            return
        }

        setSending(true);
        let result = await supabase.auth.signUp(
            {
                email, password
            },
        )

        showMessage({description: "We have send you", message: "Sending", type: "info"})
        setSending(false)
    }

    return <View className={"top-[10%] mx-auto"}>

        <FinanceerInput
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={setEmail}
        />

        <FinanceerInput
            value={password}
            autoCapitalize="none"
            keyboardType="password"
            placeholder="Password"
            onChangeText={setPassword}
        />

        <Button onPress={signUp} label={"Register"}/>

    </View>
}
