/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import askForProtocol from "./askForProtocol/index.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.existingProtocol) {
        return
    }

    drawSectionHeader({
        generator,
        title: `Choose a protocol`,
        subTitle: ``
    })

    await askForProtocol(props)
    payload.promptGroupsPassed.existingProtocol = true
}
