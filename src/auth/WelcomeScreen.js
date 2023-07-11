import {Image, View} from "react-native";
import {routes} from "routes";
import Button from "components/Button";


export const WelcomeScreen = ({navigation}) => {

    return <>
        <View className={"mt-10 mx-auto flex-1"}>
            <Image className="mb-auto" source={require('../../assets/logo.png')}/>
        </View>

        <View className={"mb-20 w-5/6 flex-col mx-auto"}>

            <Button classNames={"mb-10"} onPress={() => navigation.navigate(routes.login.loginPassword)}
                    label={"Login"}/>

            <Button classNames={""} onPress={() => navigation.navigate(routes.register)} label={"Register"}/>
        </View>
    </>


}
