import {Dimensions, ScrollView, View} from "react-native";
import TransactionAmount from "transactions/TransactionAmount";
import FinanceerText from "components/FinanceerText";
import {format} from "date-fns";
import TransactionCard from "transactions/TransactionCard";

const TransactionPage = ({month}) => <View className={"h-full"}>
    <View className={"flex-row my-1 m-3"}>
        <TransactionAmount amount={month.sum} className={"flex-1 text-2xl"}/>
        <FinanceerText className={"text-2xl mr-3"}>
            {format(new Date(month.datetime), 'MMM yyyy')}
        </FinanceerText>
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style={{width: Dimensions.get("screen").width}}>
        {month.transactions.map(transaction => <TransactionCard key={transaction.id} transaction={transaction}/>)}
    </ScrollView>
</View>

export default TransactionPage
