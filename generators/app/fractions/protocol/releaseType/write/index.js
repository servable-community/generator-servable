/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"

export default async (props) => {

    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const defaultTargetPath = `${payload.targetFolder}/${payload.protocolId}`
    const targetPather = targetRootPath ? v => `${targetRootPath}/${v}` : v => `${defaultTargetPath}/${v}`

    const localPath = v => `${__dirname}/template/${v}`
    switch (payload.releaseType) {
        case 'github': {
            generator.fs.copy(localPath('github/workflows/release.yml'), targetPather(`.github/workflows/release.yml`,), payload)
        } break
        case 'gitlab': {
            generator.fs.copy(localPath('gitlab-ci.yml'), targetPather(`.gitlab-ci.yml`,), payload)
        } break
        default: {

        } break
    }
}
