/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import validateNumber from "../../lib/validateNumber.js"
import askForGeneric from "../utils/askForGeneric.js"
import askForGenericPort from "../utils/askForGenericPort.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props

    if (!force && payload.asks.dashboard) {
        return
    }

    drawSectionHeader({
        generator,
        title: `SERVABLE DASHBOARD 🚀`,
        subTitle: `Servable dashboard helps you visualize and edit the app's data and configuration.`
    })

    if (!force) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'useDashboard',
                message: 'Use a Servable Dashboard? (recommended)',
                defaultValue: true
            }
        })
    }
    else {
        payload.useDashboard = true
    }

    if (!payload.useDashboard) {
        return
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'dashboardMainPassword',
            message: 'Dashboard password?',
            defaultValue: 'PASSWORD_TO_CHANGE'
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'dashboardMainUsername',
            message: '👩‍💻 Dashboard username?',
            defaultValue: 'admin'
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appDashboardPort',
            message: 'Dashboard port?',
            port: { value: 4040, },
            validator: validateNumber,
        }
    })

    // payload.appDashboardPort = 4040

    payload.asks.dashboard = true
}
