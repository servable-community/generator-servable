import chalk from "chalk"


export default props => {
    const { title, subTitle, generator } = props

    generator.log(chalk.yellow(`\n${title} --------------`))
    generator.log(chalk.italic(`${subTitle}\n`))
}
