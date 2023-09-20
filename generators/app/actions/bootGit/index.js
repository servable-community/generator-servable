/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
    const { generator, payload, location } = props
    if (!payload.gitInit) {
        return
    }

    const options = location ? {
        cwd: location
    } : {}

    generator.fs.copy(generator.templatePath('gitignore'), generator.destinationPath('.gitignore'));
    generator.spawnCommand('git', ['init', '--quiet', '--initial-branch=main'], options)
}
