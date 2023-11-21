/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"

import writeForTriggers from "../../../../shared/triggers/write/index.js"

export default async (props) => {

    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const destinator = v => `${targetRootPath}/${v}`
    const originator = v => `${__dirname}/template/${v}`

    if (payload.classBootstrapFiles) {
        generator.fs.copy(originator('**/*'), destinator(''))
        generator.fs.copyTpl(originator('class/index.js'), destinator(`class/index.js`), payload)
        generator.fs.copyTpl(originator('manifest.json'), destinator(`manifest.json`), payload)
        generator.fs.copyTpl(originator('README.md'), destinator(`README.md`), payload)
    }

    await writeForTriggers({ ...props })
}
