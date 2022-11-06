import {View} from "react-native";
import FinanceerText from "components/FinanceerText";
import {useEffect, useState} from "react";
import {formatAmount} from "transactions/TransactionUtils";

const Dashboard = ({expenses, incomes}) => {

    const [expensesSum, setExpensesSum] = useState(0)
    const [incomesSum, setIncomesSum] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setExpensesSum(sum(expenses))
        setIncomesSum(sum(incomes))
        setTotal(incomesSum + -expensesSum)
    })

    return <View>
        <FinanceerText className={(total < 0 ? 'text-primary' : 'text-accent') + " text-3xl font-bold text-center mb-5"}>
            {formatAmount(total)}
        </FinanceerText>
        <View className={"flex-row justify-evenly w-11/12"}>
            <View className={"mt-"}>
                <FinanceerText className={"text-accent"}>Expenses</FinanceerText>
                <FinanceerText className={"text-accent text-2xl font-bold "}>
                    -{formatAmount(expensesSum)}
                </FinanceerText>
            </View>

            <View className={"mt-"}>
                <FinanceerText className={"text-primary"}>Incomes</FinanceerText>
                <FinanceerText className={"text-primary text-2xl font-bold"}>
                    +{formatAmount(incomesSum)}
                </FinanceerText>
            </View>


        </View>
    </View>


}


const sum = (transactions) => transactions.reduce((partialSum, transaction) => partialSum +
    transaction.amount, 0)

export default Dashboard