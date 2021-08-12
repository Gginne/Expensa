import axios from "axios"

export const getCategories = async (token) => {
    try{
        const res = await axios.get("/categories", { 
            headers: {'x-auth-token': token} 
        })
        console.log(res)
        const expenses = res.data.expense.map(({cols}) => ({name: cols.name, id:cols.id}))
        return {expenses}
    } catch(err){
        console.log(err)
    }
}