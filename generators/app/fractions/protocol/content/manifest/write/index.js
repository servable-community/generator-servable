/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"


export default async (props) => {
    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    let targetPather = props.targetPather
    if (!targetPather) {
        targetPather = targetRootPath ? v => `${targetRootPath}/${v}` : generator.destinationPath.bind(generator)
    }

    payload.protocolCategories = payload.protocolCategories ? payload.protocolCategories : ''
    generator.fs.copyTpl(`${__dirname}/template/manifest.json`, targetPather(`manifest.json`), payload)
}
