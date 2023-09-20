import fs from 'fs'
export default async (path) => {
    try {
        console.log(`→ fileexists ${path}.\n`)
        await fs.promises.access(path)
        console.log(`→ fileexists ${path}.\n`)
        return true
    } catch (e) {
        console.error()
        return false
    }
}
