import {View} from "react-native";
import FinanceerText from "components/FinanceerText";

const Dashboard = ({expenses, incomes}) => {

    if (!expenses) {
        return
    }

    return <View className={"flex-row"}><FinanceerText className={"text-red-600 text-2xl font-bold"}>
        - {sum(expenses)}
    </FinanceerText>
    </View>
}


const sum = (transactions) => transactions.reduce((partialSum, transaction) => partialSum + transaction.amount, 0)

export default Dashboard