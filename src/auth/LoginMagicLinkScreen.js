import React, {useState} from "react";
import {Pressable, View} from "react-native";
import supabase from "supabase";
import {showMessage} from "react-native-flash-message";
import FinanceerText from "components/FinanceerText";
import {routes} from "routes";
import * as Linking from "expo-linking";
import {useNavigation} from "@react-navigation/native";
import FinanceerInput from "components/FinanceerInput";

const LoginMagicLinkScreen = () => {

    const [email, setEmail] = useState()
    const navigation = useNavigation()

    const [isSending, setSending] = useState(false);
    const [sentEmail, setSentEmail] = useState('')

    const sendMagicLink = async email => {
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
        } else {
            setSentEmail(email)
        }
    }

    return (
        <>
            <View className={"items-center w-5/6 mx-auto"}>
                <FinanceerText className={"text-sm"}>We are using Magic Links in order to sign you up and
                    in.</FinanceerText>


                <FinanceerInput className={"w-3/4 mx-auto"}
                                value={email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="Enter your email address"
                                onChangeText={setEmail}
                />

                <Pressable className={"mx-auto"} disabled={isSending}
                           onPress={() => sendMagicLink(email)}>
                    <FinanceerText className={"text-primary mt-5"}>
                        Send me a Magic Link!
                    </FinanceerText>
                </Pressable>

                {sentEmail &&
                    <FinanceerText className={"mt-3"}>
                        We have sent an email with the Magic Link to {sentEmail}.
                    </FinanceerText>}

                <Pressable className={"mx-auto"}
                           onPress={() => navigation.navigate(routes.login.loginPassword)}>
                    <FinanceerText className={"text-primary mt-5"}>
                        Wanna have a pw?
                    </FinanceerText>
                </Pressable>


            </View>
        </>
    )

}

export default LoginMagicLinkScreen
