/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"

import writeProtocolManifest from "../../manifest/write/index.js"

export default async (props) => {

    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    payload.protocolDescription = payload.protocolDescription ? payload.protocolDescription : ''
    payload.author = payload.author ? payload.author : ''

    const targetPather = v => `${targetRootPath}/${v}`

    generator.fs.copy(`${__dirname}/template/**/*`, generator.destinationPath(''))
    generator.fs.copyTpl(`${__dirname}/template/README.md`, targetPather(`README.md`), payload)
    await writeProtocolManifest({ ...props, targetPather })
}
