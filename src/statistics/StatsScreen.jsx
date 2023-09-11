import FinanceerText from "components/FinanceerText";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {routes} from "routes";

const StatsScreen = () => {

    const navigation = useNavigation()

    const statistics = [
        {
            label: "Months Overview",
            route: routes.monthsOverview
        },
        {
            label: "Compare months",
            route: routes.monthsCompare
        }
    ]

    return <View>
        {statistics.map(statistic =>
            <TouchableOpacity key={statistic.label} onPress={() => navigation.navigate(statistic.route)}>
                <View className={"flex-row h-14  items-center my-2 bg-gray"}>
                    <View className={"ml-5"}>
                        <FinanceerText>{statistic.label}</FinanceerText>
                    </View>
                </View>
            </TouchableOpacity>
        )}
    </View>


}

export default StatsScreen
