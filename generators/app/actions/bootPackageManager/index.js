/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
    const { generator, payload,
        installDependencies = true,
        targetPathFinder
    } = props

    const _targetPathFinder = targetPathFinder
        ? targetPathFinder
        : generator.destinationPath.bind(generator)

    switch (payload.pkgManager) {
        case 'yarn': {
            generator.fs.copyTpl(generator.templatePath('.yarnrc'), _targetPathFinder('.yarnrc'), payload)
        } break
        case 'pnpm': {
            generator.fs.copyTpl(generator.templatePath('.npmrc-pnpm'), _targetPathFinder('.npmrc'), payload)
        } break
        default: break
    }

    payload.installDependencies = installDependencies
}
