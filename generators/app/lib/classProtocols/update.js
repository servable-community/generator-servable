
import ejs from 'ejs'
import { cleanProtocols } from '@servable/manifest'

export default async (props) => {
    const {
        folder,
        items,
        generator,
        payload,
        isTemplate
    } = props
    // if (false) {
    //     Engine.launchServable()
    // }

    try {
        const targetPath = `${folder}/class/protocols.js`
        let i = cleanProtocols(items)
        // let i = items
        i = i ? i : []
        let data = `export default ${JSON.stringify(items, null, 4)}`
        if (isTemplate) {
            data = await ejs.render(data, payload, {
                async: true,
                strict: false
            })
        }
        generator.fs.write(targetPath, data)
    } catch (e) {
        console.error(e)
    }
}
