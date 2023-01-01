import React, {useState} from "react";
import * as Linking from "expo-linking";
import {Pressable, View} from "react-native";
import supabase from "supabase";
import FinanceerInput from "components/FinanceerInput";
import {showMessage} from "react-native-flash-message";
import FinanceerText from "components/FinanceerText";


const LoginScreen = () => {

    const [email, setEmail] = useState()
    const [isSending, setSending] = useState(false);
    const [sentEmail, setSentEmail] = useState('')

    async function sendMagicLink(email) {
        let redirectURL = Linking.createURL("/SignIn");

        if (!email) {
            showMessage({
                message: "Email is required",
                type: "danger"
            })
            return
        }

        setSending(true);
        let result = await supabase.auth.signInWithOtp(
            {
                email, options: {
                    emailRedirectTo: redirectURL,
                }
            },
        );

        setSending(false);

        if (result.error) {
            showMessage({description: result.error.message, message: "Could not sent email", type: "danger"})
            console.log(JSON.stringify(result))
        } else {
            setSentEmail(email)
        }
    }

    return (
        <>
            <View className={"items-center w-5/6 mx-auto"}>
                <FinanceerText>Logo place holder</FinanceerText>
                <FinanceerText className={"font-bold"}>Heya!</FinanceerText>
                <FinanceerText>Welcome to Financeer</FinanceerText>

                <FinanceerText className={"text-sm"}>We are using magic links in order to sign you up and
                    in.</FinanceerText>
                <FinanceerInput className={"w-3/4 mx-auto"}
                                value={email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="Enter your email address"
                                onChangeText={setEmail}
                />


                <Pressable className={"btn btn-primary mx-auto"} disabled={isSending}
                           onPress={() => sendMagicLink(email)}>
                    <FinanceerText className={"text-primary mt-5"}>
                        Send me a Magic Link!
                    </FinanceerText>
                </Pressable>

                {sentEmail &&
                    <FinanceerText className={"mt-3"}>
                        We have sent an email with the Magic Link to {sentEmail}.
                    </FinanceerText>}

            </View>
        </>
    )

}

export default LoginScreen