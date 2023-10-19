# <%= protocolName %> Protocol

![logo](/static/img/icon.png)

[![npm Package](https://img.shields.io/npm/v/<%= protocolId %>.svg?style=flat-square)](https://www.npmjs.org/package/<%= protocolId %>)
[![NPM Downloads](https://img.shields.io/npm/dm/<%= protocolId %>.svg)](https://npmjs.org/package/<%= protocolId %>)
[![Build Status](<%= repositoryUrl %>/actions/workflows/release.yml/badge.svg)](<%= repositoryUrl %>/actions/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<%= protocolDescription %>

## Install
```bash
yarn add <%= protocolId %>
```

## Auxiliary packages

### Shared library
[<%= protocolId %>-shared](<%= repositoryUrl %>-shared)
```bash
yarn add <%= completedProtocolId %>-shared
```

### React library
[<%= protocolId %>-react](<%= repositoryUrl %>-react)
```bash
yarn add <%= completedProtocolId %>-react
```

## Protocol
### Configuration
#### Payload sample
```json
 {
    "id": "<%= protocolId %>",
    "name": "<%= protocolId %>",
    "slug": "<%= protocolId %>",
    "module": {
        "<%= completedProtocolId %>": "*"
    },
    "version": "*",
    "params": {
        "liveClasses": ["#TODO"],
        "schema": {
            "restrictSecurity": true
        }
    }
}
```
#### Reference


### Capacities
#### Schema
**Classes**
TODO

**Class level permissions**
TODO

**Indexes**
```json
{
    "_myIndex": {
        "protocolField": 1
    }
}
```

**Fields**
```json
{
    "protocolField": {
        "type": "String"
    }
}
```

#### Protocol class
TODO
#### Classes
TODO
#### Triggers
TODO
#### Before init
TODO
#### After init
TODO
#### Seed
TODO
#### Config
TODO
#### Functions
TODO
#### Jobs
TODO
#### Live classes
TODO

### Security
TODO

### Performance
TODO

## Servable Documentation
You can find here the complete [servable documentation](https://documentation.servablecommunity.com) with guides and api reference.

## License

MIT © [<%= githubUsername %>](https://github.com/<%= githubUsername %>)
