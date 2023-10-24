/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
    const { generator, payload, location } = props
    if (!payload.gitInit) {
        return
    }

    const options = location ? {
        cwd: location
    } : {}

    const targetPather = location ? v => `${location}/${v}` : generator.destinationPath.bind(generator)

    generator.fs.copy(generator.templatePath('gitignore'), targetPather('.gitignore'))
    generator.spawnCommand('git', ['init', '--quiet', '--initial-branch=main'], options)
}
