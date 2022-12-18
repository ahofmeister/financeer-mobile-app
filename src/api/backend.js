import 'react-native-url-polyfill/auto'
import {lastDayOfMonth, startOfMonth} from "date-fns";
import supabase from "supabase";
import {showMessage} from "react-native-flash-message";


export const fetchExpenses = async (date) => {
    return fetchTransactionsByType(date, 'EXPENSE')
};

export const fetchIncomes = async (date) => {
    return fetchTransactionsByType(date, 'INCOME')
};

export const fetchTransactionsByType = async (date, type) => {
    let monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const {
        data,
        error
    } = await supabase
        .from('transactions')
        .select('*,  category(name)')
        .eq('type', type)
        .gte('datetime', `${monthYear}-${startOfMonth(date).getDate()}`)
        .lte('datetime', `${monthYear}-${lastDayOfMonth(date).getDate()}`)
        .order('amount')

    if (error) {
        return
    }

    return data
};

export const fetchTransactions = async (date) => {
    let monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const {
        data,
        error
    } = await supabase
        .from('transactions')
        .select('*,  category(name)')
        .gte('datetime', `${monthYear}-${startOfMonth(date).getDate()}`)
        .lte('datetime', `${monthYear}-${lastDayOfMonth(date).getDate()}`)
        .order('amount')

    if (error) {
        return
    }

    return data
};

export const fetchCategories = async () => {
    const {data, error} = await supabase.from('categories').select('*')

    if (error) {
        return
    }

    return data
};

export const deleteCategory = async (id) => {
    const {error} = await supabase.from('categories').delete(id).eq('id', id)

    if (error) {
        return error
    }
}

export const upsertCategory = async (id, name) => {
    const userId = (await supabase.auth.getUser()).data.user.id

    return supabase
        .from('categories')
        .upsert({id, name, user_id: userId})
        .select();

}


export const createTransaction = async (amount, type, datetime, description, category) => {
    const {data} = await supabase.auth.getUser()
    const {error} = await supabase
        .from('transactions')
        .insert({amount, type, datetime, description, category, user_id: data.user.id})


    if (!error) {
        showMessage({
                message: "Success",
                type: 'success',
                position: "center"
            }
        );
    }
}