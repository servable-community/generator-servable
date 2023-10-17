/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import updateProtocolClasses from "../../../actions/updateProtocolClasses/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import addClassClass from "../../../prompts/bootstrapClass/index.js"
import classInformations from "../../../prompts/classInformations/index.js"
import protocolSchemaVersion from "../../../prompts/classInformations/lib/protocolSchemaVersion.js"
import targetProtocol from "../../../prompts/targetProtocol/index.js"

export default {
    id: 'class',
    path: 'class/new',
    aliases: ['class',],
    name: 'Class → New ✨',
    prompting: async (props) => {
        const { generator, payload } = props

        await targetProtocol(props)
        await addClassClass(props)
        await classInformations(props)
        await updateProtocolClasses(props)
    },
    writing: async (props) => {
        const { generator, payload } = props
        if (payload.addClassClass) {
            const targetPath = `${payload.targetProtocolAbsolute}/classes/${payload.className.toLowerCase()}`
            generator.fs.copy(generator.templatePath('**/*'), generator.destinationPath(targetPath))
            generator.fs.copyTpl(generator.templatePath('class/index.js'), generator.destinationPath(`${targetPath}/class/index.js`), payload)
            generator.fs.copyTpl(generator.templatePath('manifest.json'), generator.destinationPath(`${targetPath}/manifest.json`), payload)
            generator.fs.copyTpl(generator.templatePath('README.md'), generator.destinationPath(`${targetPath}/README.md`), payload)
        }

        const version = await protocolSchemaVersion(payload.targetProtocolAbsolute)
        const targetSchemaPath = `${payload.targetProtocolAbsolute}/schema/${version}/classes.json`
        generator.fs.writeJSON(generator.destinationPath(targetSchemaPath), payload.classClasses)
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Class created",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
    }
}
