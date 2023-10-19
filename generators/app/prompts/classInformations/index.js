/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForClassName from "./askForClassName.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import protocolClassesRaw from "./lib/protocolClassesRaw.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props

    drawSectionHeader({
        generator,
        title: `Class informations 🚀`,
        subTitle: `Servable required class informations.`
    })

    const classes = await protocolClassesRaw(payload.targetProtocolAbsolute)
    await askForClassName({ ...props, classes })

    // await askForGeneric({
    //     ...props, options: {
    //         ...props.options,
    //         name: 'appJavascriptKey',
    //         message: 'Javascript key?',
    //         defaultValue: 'JAVASCRIPT_KEY_TO_CHANGE'
    //     }
    // })
}
