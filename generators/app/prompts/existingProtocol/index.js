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
        title: `FIND A PROTOCOL ⚙`,
        subTitle: `Servable can be used in a staging or production configurations, or both at the same time.`
    })

    await askForProtocol(props)
    payload.promptGroupsPassed.existingProtocol = true
}
