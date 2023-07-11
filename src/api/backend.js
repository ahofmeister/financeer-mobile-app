import 'react-native-url-polyfill/auto'
import {format, lastDayOfMonth, startOfMonth} from "date-fns";
import supabase from "supabase";

export const fetchExpenses = async (date) => {
    return fetchTransactionsByType(date, 'EXPENSE')
}

export const fetchIncomes = async (date) => {
    return fetchTransactionsByType(date, 'INCOME')
}

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
}

export const fetchTransactionsByCategory = async (dateFrom, dateTo, id) => {
    const {
        data,
        error
    } = await supabase
        .from('transactions')
        .select('*')
        .eq('category', id)
        .gte('datetime', format(dateFrom, 'yyyy-MM-dd'))
        .lte('datetime', format(dateTo, 'yyyy-MM-dd'))
        .order('amount')

    if (error) {
        console.log(error)
        return
    }

    return data
}

export const fetchTransactions = async (date) => {
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const {
        data,
        error
    } = await supabase
        .from('transactions')
        .select('*,  category(name)')
        .gte('datetime', `${monthYear}-${startOfMonth(date).getDate()}`)
        .lte('datetime', `${monthYear}-${lastDayOfMonth(date).getDate()}`)
        .order('datetime', {ascending: false})

    if (error) {
        return
    }

    return data
}

export const fetchCategories = async () => {
    const {data, error} = await supabase.from('categories').select('*')

    if (error) {
        return
    }

    return data
}

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
        .upsert({id, name: name.trim(), user_id: userId})
}

export const saveTransaction = async (id, amount, datetime, description, category) => {
    const {data} = await supabase.auth.getUser()
    return supabase
        .from('transactions')
        .upsert({id, amount, datetime, description, category, user_id: data.user.id})
        .select()
}

export const deleteTransaction = async (id) => {
    return supabase.from('transactions').delete(id).eq('id', id);
}

export const getTransactionsByCategorySummary = async (dateFrom, dateTo) => {
    return supabase.rpc("transactions_by_category",  {datefrom: dateFrom, dateto: dateTo}).order("amount", { ascending: false })
}
