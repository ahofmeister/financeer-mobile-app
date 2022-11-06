import FinanceerText from "components/FinanceerText";
import {formatAmount} from "transactions/TransactionUtils";


const TransactionAmount = ({type, amount}) => {
    return <FinanceerText className={type === 'EXPENSE' ? 'text-accent' : 'text-primary'}>
        {type === 'EXPENSE' ? '-' : ''}
        {formatAmount(amount)}
    </FinanceerText>
}

export default TransactionAmount

