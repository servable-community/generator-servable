import chalk from "chalk"
import quotePlain from "../quotePlain.js"

export default props => {
    const { title, subTitle, generator } = props
    let _sub = subTitle
    if (!subTitle) {
        _sub = quotePlain()
    }

    generator.log(`\n\n\n`)
    // generator.log(chalk.red(`\n......................................................................`))
    generator.log(chalk.red(`\n${title}`))
    generator.log(chalk.italic(`${_sub}`))
    generator.log(chalk.red(`.......................................`))
    generator.log(``)
    // generator.log(``)
}
