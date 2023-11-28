/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {

    const { generator, payload } = props

    generator.fs.copy(generator.templatePath('lib'), generator.destinationPath('lib'))
    // generator.fs.copy(generator.templatePath('config'), generator.destinationPath('config'))
    generator.fs.copy(generator.templatePath('.vscode'), generator.destinationPath('.vscode'))

    generator.fs.copyTpl(generator.templatePath('README.md'), generator.destinationPath('README.md'), payload)
    generator.fs.copyTpl(generator.templatePath('package.json'), generator.destinationPath('package.json'), payload)
    generator.fs.copyTpl(generator.templatePath('lib/app/index.json'), generator.destinationPath('lib/app/index.json'), payload)
    generator.fs.copyTpl(generator.templatePath('servable.config.js'), generator.destinationPath('servable.config.js'), payload)
    generator.fs.copyTpl(generator.templatePath('env'), generator.destinationPath('.env'), payload)
    generator.fs.copyTpl(generator.templatePath('Dockerfile'), generator.destinationPath('Dockerfile'), payload)
    generator.fs.copyTpl(generator.templatePath('.dockerignore'), generator.destinationPath('.dockerignore'), payload)
    generator.fs.copyTpl(generator.templatePath('jest.config.json'), generator.destinationPath('jest.config.json'), payload)
    generator.fs.copyTpl(generator.templatePath('jsconfig.json'), generator.destinationPath('jsconfig.json'), payload)
    generator.fs.copyTpl(generator.templatePath('lib/app/system/docker/docker-compose.yaml'), generator.destinationPath('lib/app/system/docker/docker-compose.yaml'), payload)
}
