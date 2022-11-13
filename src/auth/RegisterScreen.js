import DefaultLayout from "Layout/DefaultLayout";
import {Button} from "react-native";
import supabase from "supabase";
import {useState} from "react";
import FinanceerInput from "components/FinanceerInput";
import {showMessage} from "react-native-flash-message";


const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {

        const {error} = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            showMessage({message: error?.message})
        }
    }

    return <DefaultLayout>
        <FinanceerInput label="Email"
                        onChangeText={setEmail}
                        value={email}
        />

        <FinanceerInput label="Password" secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
        />


        <Button title={"Register"} onPress={handleRegister}></Button>

    </DefaultLayout>

}

export default RegisterScreen