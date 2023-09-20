export default {
    id: "<%= appId %>",
    name: "<%= appName %>",
    configurations: [<% if(configurations.includes('staging')) { %>
    {
        key: 'staging',
        enabled: true,
        // params: {
        //     skipWiring: true,
        //     afterMigration: {
        //         shouldRun: true,
        //         continueToNextConfigurationIfOk: false
        //     },
        //     decoyDatabase: {
        //         maxDBSize: 1000,
        //         maxPeriod: 24 * 7
        //     }
        // },
    },<% } %>
<% if (configurations.includes('production')) { %> {
    key: 'production',
    enabled: true,
    params: {},
},<% } %>
  ],
}
