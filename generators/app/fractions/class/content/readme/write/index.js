/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"


export default async (props) => {
    const { generator, payload, targetRootPath, } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const destinator = targetRootPath ? v => `${targetRootPath}/${v}` : generator.destinationPath.bind(generator)

    generator.fs.copyTpl(`${__dirname}/template/README.md`,
        destinator(`${targetRootPath}/README.md`),
        payload)
}
