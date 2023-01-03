import FinanceerText from "components/FinanceerText";
import {formatAmount} from "transactions/TransactionUtils";


const TransactionAmount = (props) => {
    return <FinanceerText      {...props}
                               className={`${props.type === 'EXPENSE' ? 'text-expense' : 'text-income'} ${props.className}`}>
        {props.type === 'EXPENSE' ? '-' : ''}
        {formatAmount(props.amount)}
    </FinanceerText>
}

export default TransactionAmount

