/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForConfigurations from "./askForConfigurations.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
// import askForState from "./askForState.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.configuration) {
        return
    }

    drawSectionHeader({
        generator,
        title: `Configurations ⚙`,
        subTitle: `Servable can be used in a staging or production configurations, or both at the same time.`
    })

    // await askForState(props)
    await askForConfigurations(props)
    payload.promptGroupsPassed.configuration = true
}
