/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolClassesRaw from "../../prompts/classInformations/lib/protocolClassesRaw.js"

export default async (props) => {
    const { generator, payload, } = props

    const targetClass = {
        className: payload.className,
        fields: {
        },
        classLevelPermissions: {
            find: {
                requiresAuthentication: true
            },
            count: {
                requiresAuthentication: true
            },
            get: {
                requiresAuthentication: true
            },
            create: {
                "*": true
            },
            update: {
                requiresAuthentication: true
            },
            delete: {
                requiresAuthentication: true
            },
            addField: {
                "*": true
            },
            protectedFields: {
                "*": []
            }
        },
        indexes: {
            _id_: {
                _id: 1
            }
        }
    }

    let classes = await protocolClassesRaw(payload.targetProtocolAbsolute) || []
    if (!classes || !classes.length) {
        classes = []
    }

    const classesWithoutTarget = classes.filter(a => a.className !== targetClass.className)
    classesWithoutTarget.push(targetClass)
    payload.classClasses = classesWithoutTarget
}

const w = async (props) => {

}
