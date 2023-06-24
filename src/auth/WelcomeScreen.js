import DefaultLayout from "Layout/DefaultLayout";
import FinanceerText from "components/FinanceerText";
import {View} from "react-native";
import {routes} from "routes";
import Button from "components/Button";

export const WelcomeScreen = ({navigation}) => {

    return <DefaultLayout>
        <View className={"mx-auto"}>
            <FinanceerText>Logo place holder</FinanceerText>
            <FinanceerText className={"font-bold text-2xl"}>Financeer</FinanceerText>


            <Button classNames={"mt-10"} onPress={() => navigation.navigate(routes.login.loginPassword)} label={"Login"}/>

            <Button classNames={"mt-10"} onPress={() => navigation.navigate(routes.register)} label={"Register"}/>
        </View>
    </DefaultLayout>


}
