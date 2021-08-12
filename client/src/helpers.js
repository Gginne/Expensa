import axios from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const getCategories = async () => {
    try{
        const token = cookies.get('token')
        const res = await axios.get("/categories/", { 
            headers: {'x-auth-token': token} 
        })
        console.log(res)
        const expenses = res.data.expense.map(exp => exp.cols.name)
        return {expenses}
    } catch(err){
        console.log(err)
    }
}