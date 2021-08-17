import apiClient from "./apiClient"

export const getCategories = async () => {
    try{
        const res = await apiClient.get("/api/categories")
        const expenses = res.data.expense.map(({cols}) => ({name: cols.name, id:cols.id}))
        
        return {expenses}
    } catch(err){
        console.log(err)
    }
}