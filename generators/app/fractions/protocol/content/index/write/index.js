/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"


export default async (props) => {
    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    let destinator = props.destinator
    if (!destinator) {
        destinator = targetRootPath ? v => `${targetRootPath}/${v}` : generator.destinationPath.bind(generator)
    }

    payload.protocolCategories = payload.protocolCategories ? payload.protocolCategories : ''
    generator.fs.copyTpl(`${__dirname}/template/index.md`, destinator(`index.md`), payload)
    generator.fs.copyTpl(`${__dirname}/template/index.json`, destinator(`index.json`), payload)
}
