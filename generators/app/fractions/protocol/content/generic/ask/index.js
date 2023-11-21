import askForProtocolManifest from "../../manifest/ask/index.js"
import askForTriggers from "../../../../shared/triggers/ask/index.js"

export default async (props) => {
    await askForProtocolManifest(props)
    await askForTriggers(props)
}
