import askForProtocolIndex from "../../index/ask/index.js"
import askForTriggers from "../../../../shared/triggers/ask/index.js"
import validateNonMandatory from "../../../../../lib/validateNonMandatory.js"
import valdiateNonEmpty from "../../../../../lib/valdiateNonEmpty.js"
import askForGenericBulk from "../../../../../prompts/utils/askForGenericBulk.js"

export default async (props) => {
    await askForProtocolIndex(props)
    await askForTriggers(props)

    await askForGenericBulk({
        ...props, items: [
            {
                name: 'protocolSampleClassShouldAdd',
                validate: validateNonMandatory
            },
        ]
    })

    if (props.payload.protocolSampleClassShouldAdd) {
        await askForGenericBulk({
            ...props, items: [
                {
                    name: 'protocolSampleClassName',
                    validate: valdiateNonEmpty
                },
            ]
        })
    }
}




