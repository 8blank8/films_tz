export const getProperty = <T extends object>(instance: new (data: any) => T): { [K in keyof T]: string } => {

    let keys: any = {}

    Object.keys(new instance({})).forEach(key => keys[key] = key)

    return keys
}