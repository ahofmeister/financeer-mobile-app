import 'react-native-url-polyfill/auto'
import {format} from "date-fns";
import supabase from "supabase";

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

export const fetchTransactions = async (from, to) => {
    const {
        data,
        error
    } = await supabase
        .from('transactions')
        .select('*,  category(name)')
        .gte('datetime', from.toISOString())
        .lte('datetime', to.toISOString())
        .order('datetime', {ascending: false})

    if (error) {
        return error
    }

    return data
}

export const fetchParentCategories = async () => {
    const {data, error} = await supabase.from('categories').select('*')
        .is("parent_id", null).order("name")

    if (error) {
        return
    }

    return data
}

export const fetchCategories = async () => {
    const {data, error} = await supabase.from('categories').select('*')

    if (error) {
        return error
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
    return supabase.rpc("transactions_by_category", {
        datefrom: format(dateFrom, 'yyyy-MM-dd'),
        dateto: format(dateTo, 'yyyy-MM-dd')
    })
}

export const getCategoriesTotal = async (categoryId) => {
    return supabase.rpc("category_total", {categoryid: categoryId})
}

