import {createClient} from "@supabase/supabase-js";
import {AsyncStorage} from "react-native";
import 'react-native-url-polyfill/auto'
import {lastDayOfMonth, startOfMonth} from "date-fns";

const supabaseUrl = 'https://pmjdlbjdhorclvnptaod.supabase.co'
const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtamRsYmpkaG9yY2x2bnB0YW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1MzczMTksImV4cCI6MTk4MjExMzMxOX0.wU9mqQwRzIucXj94ZZDjz3MPRaC4bBGaB7k91Sq7w64', {
    auth: {
        storage: AsyncStorage,
    },
})


export const fetchExpenses = async (date) => {
    return fetchTransactions(date, 'EXPENSE')
};

export const fetchIncomes = async (date) => {
    return fetchTransactions(date, 'INCOME')
};

export const fetchTransactions = async (date, type) => {
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
        console.log(error)
        return
    }

    return data
};

export const fetchCategories = async () => {
    const {data, error} = await supabase.from('categories').select('*')

    if (error) {
        console.log(error)
        return
    }

    return data
};

export const createTransaction = async (amount, type, datetime, description, category) => {
    const {error} = await supabase
        .from('transactions')
        .insert({amount, type, datetime, description, category})
}