import protocolSchemaRaw from './protocolSchemaRaw.js'

export default async (folder) => {

    try {
        const schema = await protocolSchemaRaw(folder)
        const ownClasses = (schema && schema.own && schema.own.classes) ? schema.own.classes : []
        return ownClasses
    } catch (e) {
        console.error(e)
        return null
    }
}
