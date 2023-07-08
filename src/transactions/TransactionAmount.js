import FinanceerText from "components/FinanceerText";
import {formatAmount} from "transactions/TransactionUtils";


const TransactionAmount = ({amount, ...props}) => {
    console.log(amount < 0)
    return <FinanceerText      {...props}
                               className={`${amount < 0 ? 'text-expense' : 'text-income'} ${props.className}`}>
        {formatAmount(amount)}
    </FinanceerText>
}

export default TransactionAmount

