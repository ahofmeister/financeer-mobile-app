import FinanceerText from "components/FinanceerText";

const Percentage = ({amount, total}) => <FinanceerText
    className={"text-center"}>{(amount / total * 100 || 0).toFixed(2)} %</FinanceerText>
export default Percentage
