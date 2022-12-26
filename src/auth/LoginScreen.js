import DefaultLayout from "Layout/DefaultLayout";
import {Button} from "react-native";
import supabase from "supabase";
import {useState} from "react";
import FinanceerInput from "components/FinanceerInput";
import {showMessage} from "react-native-flash-message";
import {useNavigation} from "@react-navigation/native";
import {routes} from "routes";


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const handleLogin = async () => {

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            showMessage({
                type: 'danger',
                message: error.message
            })
        }

    };

    return <DefaultLayout>
        <FinanceerInput label="Email"
                        onChangeText={setEmail}
                        value={email}
                        onSubmitEditing={handleLogin}
        />

        <FinanceerInput label="Password" secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        onSubmitEditing={handleLogin}
        />


        <Button title={"Login"} onPress={handleLogin}/>
        <Button title={"Join Financeer"} onPress={() => navigation.navigate(routes.register)}/>


    </DefaultLayout>

}

export default LoginScreen