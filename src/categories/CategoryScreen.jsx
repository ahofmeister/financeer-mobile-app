import React, {useEffect, useState} from "react";
import {getCategoriesTotal} from "api/backend";
import FinanceerText from "components/FinanceerText";
import {View} from "react-native";
import TransactionAmount from "transactions/TransactionAmount";
import {format, parse} from "date-fns";

const CategoryScreen = ({route}) => {

    const [data, setData] = useState()

    const category = route.params.category

    useEffect(() => {
        getCategoriesTotal(category?.id).then(response => setData(response.data))

    }, [category])


    return <View className={"m-3"}>
        <FinanceerText className={"text-3xl"}>{category.name}</FinanceerText>
        {data?.map(d =>
            <View key={`${d.month}${d.year}`} className={"flex-row  m-2  h-14 bg-gray items-center"}>
                <View className={`w-2/12 mx-3 pr-3 border-r`}>
                    <FinanceerText>{format(parse(`${d.year}-${d.month}`, "yyyy-MM", new Date()), 'MMM yyyy')}</FinanceerText>
                </View>
                <View className={"w-10/12"}>
                    <TransactionAmount className={"text-right mr-9"} amount={d.sum}/>
                </View>
            </View>)}
    </View>

}

export default CategoryScreen
