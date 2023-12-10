import * as dotenv from 'dotenv';
import axios from "axios";
dotenv.config()

export default async ({ protocolId, }) => {
    const baseUrl = "https://api.registry.servablecommunity.com"
    const url = `${baseUrl}/protocolbyuniqueref`

    try {
        const result = await axios({
            method: "POST",
            url,
            headers: {
                "content-type": "application/json",
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
