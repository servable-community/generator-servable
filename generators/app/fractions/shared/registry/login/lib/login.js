import * as dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export default async ({ username, password, }) => {
    const baseUrl = "https://api.registry.servablecommunity.com"
    const url = `${baseUrl}/userlogin`

    try {
        const result = await axios({
            method: "POST",
            url,
            headers: {
                "content-type": "application/json",
            },
            data: {
                username,
                password,
            }
        })

        return result.data
    } catch (e) {
        console.error(e)
    }

    return null
}
