import chalk from "chalk"

export default props => {
    const { title, subTitle, generator } = props
    // generator.log(`\n\n\n`)
    // generator.log(chalk.green(`\n......................................................................`))
    generator.log(chalk.green(`\n${title}`))
    generator.log(chalk.italic(`${subTitle}`))
    generator.log(chalk.green(`....................................`))
    generator.log(``)
    // generator.log(``)
}
