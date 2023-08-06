import {useNavigation} from "@react-navigation/native";
import {TouchableHighlight, View} from "react-native";
import {routes} from "routes";
import FinanceerText from "components/FinanceerText";
import {format} from "date-fns";
import TransactionAmount from "transactions/TransactionAmount";

const TransactionCard = ({transaction}) => {
    const navigation = useNavigation()
    return <TouchableHighlight onPress={() => navigation.navigate(routes.transaction, {transaction})}>
        <View className={"flex-row h-14  my-2 bg-gray"}>
            <View className={`w-2/12 justify-center mx-3 pr-3 border-r`}>
                <FinanceerText
                    className={"uppercase text-center"}>{format(new Date(transaction.datetime), 'MMM')}</FinanceerText>
                <FinanceerText
                    className={"text-center"}>{format(new Date(transaction.datetime), 'dd')}</FinanceerText>
            </View>
            <View className={"justify-center w-6/12"}>
                <FinanceerText numberOfLines={1} ellipsizeMode={'tail'}
                               className={"text-xs"}>{transaction.description}</FinanceerText>
                <FinanceerText numberOfLines={1} ellipsizeMode={'tail'}
                               className={"text-lg"}>{transaction.category.name}</FinanceerText>

            </View>
            <View className={"justify-center w-4/12"}>
                <TransactionAmount className={"text-right mr-9"} type={transaction.type}
                                   amount={transaction.amount}/>
            </View>
        </View>
    </TouchableHighlight>
}

export default TransactionCard
