import apiClient from "./apiClient"

export const getCategories = async () => {
    try{
        const res = await apiClient.get("/api/categories")
        const expenses = res.data.expense.map(({cols}) => ({name: cols.name, id:cols.id}))
        //console.log(res)
        return {expenses}
    } catch(err){
        console.log(err)
    }
}

export const getExpenses = async () => {
    try{
        const res = await apiClient.get("/api/expenses")
        const expenses = res.data.expense.map(({cols}) => cols)
        //console.log(res)
        return expenses
    } catch(err){
        console.log(err)
    }
}