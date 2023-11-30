import drawEnd from "../../../../lib/draw/drawEnd.js";


import targetApp from "../../../../prompts/targetApp/index.js";
import askProtocolContent from '../../../../fractions/protocol/content/generic/ask/index.js';
import writeProtocolContent from '../../../../fractions/protocol/content/generic/write/index.js';

export default {
    id: 'newlocalprotocol',
    path: 'protocol/local/new',
    aliases: ['protocol'],
    name: 'Protocol → Local → New ✨',
    version: '0.1.0',
    prompting: async (props) => {
        await targetApp(props)
        await askProtocolContent(props)
    },

    writing: async (props) => {
        const { generator, payload } = props
        const targetPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/protocols/${payload.protocolId}`
        generator.destinationRoot(targetPath)
        await writeProtocolContent({ ...props, targetPath, targetRootPath: targetPath })
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Protocol created successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
        // await openProject(props)
    }
}
