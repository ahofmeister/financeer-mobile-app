import FinanceerText from "components/FinanceerText";
import {ScrollView, View} from "react-native";
import {getTransactionsByCategorySummary} from "api/backend";
import {useEffect, useState} from "react";
import TransactionAmount from "transactions/TransactionAmount";
import {addDays, subDays} from "date-fns";
import {useIsFocused} from "@react-navigation/native";

const StatsScreen = () => {

    const [data, setTransactions] = useState()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getTransactionsByCategorySummary(subDays(new Date(), 30), addDays(new Date, 30)).then(r => setTransactions(r.data))
        }
    }, [isFocused]);

    return <View className={"h-full mx-4 mt-10"}><ScrollView className={""}>
        <FinanceerText>Shows last and next 30 days</FinanceerText>
        <FinanceerText className={"mb-10"}>Adding date picker comes next</FinanceerText>

        {data?.map((item) =>
            <View key={item.category} className={"flex-row h-12 justify-between"}>
                <FinanceerText className={"w-24"}>{item.category}</FinanceerText>
                <TransactionAmount className={"w-24 text-right"} amount={item.amount}/>
            </View>)}
    </ScrollView>
    </View>
}

export default StatsScreen
