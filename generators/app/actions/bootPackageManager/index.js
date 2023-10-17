/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import existsAsync from "../../prompts/targetClass/lib/existsAsync.js"

export default async (props) => {
    const { generator, payload,
        installDependencies = true,
        targetPathFinder
    } = props


    const _targetPathFinder = targetPathFinder
        ? targetPathFinder
        : generator.destinationPath.bind(generator)
    const fileName = fileNamer(props)
    const source = generator.templatePath(fileName)

    if (source && await existsAsync(source)) {
        const dottedFileName = `.${fileName}`
        const targetFileName = _targetPathFinder(dottedFileName)
        generator.fs.copyTpl(
            source,
            targetFileName,
            payload)
    }

    payload.installDependencies = installDependencies
}


const fileNamer = (props) => {
    switch (props.payload.pkgManager) {
        case 'yarn': {
            return 'yarnrc'
        }
        case 'pnpm': {
            return 'npmrc-pnpm'
        }
        default:
            return null
    }
}
