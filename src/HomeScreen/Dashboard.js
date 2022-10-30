import {View} from "react-native";
import FinanceerText from "components/FinanceerText";
import {useEffect, useState} from "react";

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
        <FinanceerText className={(total < 0 ? 'text-expense' : 'text-income') + " text-3xl font-bold text-center mb-5"}>
            {total}
        </FinanceerText>
        <View className={"flex-row justify-evenly w-11/12"}>
            <View className={"mt-"}>
                <FinanceerText>Expenses</FinanceerText>
                <FinanceerText className={"text-expense text-2xl font-bold "}>
                    -{expensesSum}
                </FinanceerText>
            </View>

            <View className={"mt-"}>
                <FinanceerText>Incomes</FinanceerText>
                <FinanceerText className={"text-income text-2xl font-bold"}>
                    +{incomesSum}
                </FinanceerText>
            </View>


        </View>
    </View>


}


const sum = (transactions) => transactions.reduce((partialSum, transaction) => partialSum +
    transaction.amount, 0)

export default Dashboard