import FinanceerText from "components/FinanceerText";
import {formatAmount} from "transactions/TransactionUtils";

export const getTransactionStyle = amount => {
    if (amount === 0) {
        return 'white'
    } else if (amount < 0) {
        return 'expense'
    } else if (amount > 0) {
        return 'income'
    }
}

const TransactionAmount = ({amount, ...props}) =>
    <FinanceerText      {...props} className={`text-${getTransactionStyle(amount)} ${props.className}`}>
        {formatAmount(amount || 0)}
    </FinanceerText>

export default TransactionAmount

