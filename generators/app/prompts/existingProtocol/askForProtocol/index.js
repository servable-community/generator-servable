/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

import * as dotenv from 'dotenv'
import search from './search.js'
import getById from './getById.js'
import askForGeneric from '../../utils/askForGeneric.js'
dotenv.config()

export default async (props) => {
    const { generator, payload } = props
    // const u = process.env.PROTOCOL_API_URI

    const existingProtocolId = await askForGeneric({
        ...props, options: {
            ...props.options,
            type: 'autocomplete',
            name: 'existingProtocolId',
            suggestOnly: false,
            message: 'Existing protocol?',
            searchText: 'Searching...',
            emptyText: 'Nothing found!',
            // default: 'Banana',
            source: search,
            pageSize: 4,
            validate(val) {
                return val ? true : 'Type something!'
            },
            transformer: (name,) => {
                if (!name) {
                    return name
                }

                return name
            }

        }
    })

    const item = await getById({ id: existingProtocolId })
    payload.existingProtocol = item
}
