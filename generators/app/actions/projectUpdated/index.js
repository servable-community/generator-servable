/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
    const { generator, payload, } = props

    generator.log('')
    generator.log('Your app has been updated!')
    generator.log('')
    generator.log('To start editing with Visual Studio Code, use the following commands:')
    generator.log('')
    generator.log('     code .')
    // generator.log(`     ${payload.pkgManager} run compile-web`)
    generator.log('')

}
