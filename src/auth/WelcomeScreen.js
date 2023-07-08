import DefaultLayout from "Layout/DefaultLayout";
import {View} from "react-native";
import {routes} from "routes";
import Button from "components/Button";
import Logo from '../../assets/logo.svg';


export const WelcomeScreen = ({navigation}) => {

    return <DefaultLayout>
        <View className={"mx-auto"}>
            <Logo />
            <Button classNames={"mt-10 w-24"} onPress={() => navigation.navigate(routes.login.loginPassword)}
                    label={"Login"}/>

            <Button classNames={"mt-10"} onPress={() => navigation.navigate(routes.register)} label={"Register"}/>
        </View>
    </DefaultLayout>


}
