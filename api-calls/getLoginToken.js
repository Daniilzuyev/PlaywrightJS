import * as nodefetch from "node-fetch"

export const getLoginToken = async (username, password) => {
    const response = await nodefetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({"username":username,"password":password}),
    }) 
    const body = await response.json()
    return body.token
}