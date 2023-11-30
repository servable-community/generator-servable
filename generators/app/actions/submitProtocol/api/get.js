import * as dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export default async ({ protocolId, }) => {
    const baseUrl = 'http://localhost:1387'
    // const baseUrl = 'https://api.registry.servablecommunity.com'
    // const url = `${baseUrl}/searchProtocol?searchTerm=${searchTerm}&page=${page}`
    const url = `${baseUrl}/protocolbyuniqueref`

    try {
        const result = await axios({
            method: "GET",
            url,
            headers: {
                "content-type": "application/json",
                "X-Parse-Application-Id": ""
            },
            params: {
                protocolId,
            }
        })

        return result.data
    } catch (e) {
        console.error(e)
    }

    return null
}
