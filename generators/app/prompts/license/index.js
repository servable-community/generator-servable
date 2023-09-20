/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import askForLicense from "../transverse/askForLicense.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props

    if (!force && payload.asks.license) {
        return
    }
    drawSectionHeader({
        generator,
        title: `APP INFORMATIONS 🚀`,
        subTitle: `Servable required general informations.`
    })

    await askForLicense(props)
    payload.asks.license = true
}
