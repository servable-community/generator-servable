/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {
    const { generator, payload, } = props

    generator.log('')
    generator.log('Your project ' + payload.appName + ' has been created!')
    generator.log('')

    generator.log('For more information, also visit http://servable.app and follow us @servable.')
    generator.log('\r\n')

}