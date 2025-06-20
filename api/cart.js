export default async function handler(req,res){
    const data = req.body
    console.log("data is : ", data)
    if(method === "GET"){
        const url = ""
        const requestoptions = {
            method: "GET",
            Headers:{
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(url , requestoptions)
        const data = await response.json()
        console.log(data)
        return{
            status: 200,
            message: "data is : ",
            data: data,
        }
    }
}