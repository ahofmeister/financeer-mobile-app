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
        <FinanceerText className={(total < 0 ? 'text-expense' : 'text-income') + " text-2xl font-bold text-center"}>
            {total}
        </FinanceerText>
        <View className={"flex-row"}>
            <FinanceerText className={"text-expense text-2xl font-bold mx-10"}>
                -{expensesSum}
            </FinanceerText>

            <FinanceerText className={"text-income text-2xl font-bold mx-10"}>
                +{incomesSum}
            </FinanceerText>
        </View>
    </View>


}


const sum = (transactions) => transactions.reduce((partialSum, transaction) => partialSum +
    transaction.amount, 0)

export default Dashboard