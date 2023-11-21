import classInformations from "../../../../../prompts/classInformations/index.js"
import askForGeneric from "../../../../../prompts/utils/askForGeneric.js"

export default async (props) => {
    await classInformations(props)
    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: 'confirm',
            name: 'classBootstrapFiles',
        }
    })
}
