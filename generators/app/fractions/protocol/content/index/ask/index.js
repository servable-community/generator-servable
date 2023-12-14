/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import capitalizeFirstLetter from "../../../../../lib/capitalizeFirstLetter.js"
import drawSectionHeader from "../../../../../lib/draw/drawSectionHeader.js"
import validateNonMandatory from "../../../../../lib/validateNonMandatory.js"
import license from "../../../../../prompts/license/index.js"
import askForProtocolId from "../../../../../prompts/transverse/askForProtocolId.js"
import askForGenericBulk from "../../../../../prompts/utils/askForGenericBulk.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.protocolIndex) {
        return
    }

    drawSectionHeader({
        generator,
        title: `Protocol index`,
        subTitle: ``
    })

    await askForProtocolId(props)
    const name = capitalizeFirstLetter(payload.protocolId)
    payload.protocolName = name

    await askForGenericBulk({
        ...props, items: [
            // {
            //     name: 'protocolName',
            //     validate: validateNonMandatory
            // },
            {
                name: 'protocolDescription',
                validate: validateNonMandatory
            },
            {
                name: 'protocolHomepageUrl',
                validate: validateNonMandatory
            },
            {
                name: 'protocolHowTo',
                validate: validateNonMandatory
            },
            {
                name: 'protocolDefaultSlug',
                validate: validateNonMandatory
            },
            {
                name: 'protocolIconUrl',
                validate: validateNonMandatory
            },
            {
                name: 'protocolGithubId',
                validate: validateNonMandatory
            },
            {
                name: 'protocolServableEngineVersion',
                validate: validateNonMandatory
            },
            {
                name: 'authorName',
                validate: validateNonMandatory
            },
            {
                name: 'authorEmail',
                validate: validateNonMandatory
            },
            {
                name: 'authorUrl',
                validate: validateNonMandatory
            },
            {
                name: 'authorGithubUrl',
                validate: validateNonMandatory
            },
        ]
    })

    await license(props)

    payload.promptGroupsPassed.protocolIndex = true
}
