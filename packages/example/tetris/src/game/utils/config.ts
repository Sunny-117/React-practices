export type Config = {
    plugins?: {
        ticker?: boolean;
        coreStrategy?: boolean
    },
    components?: {
        scoreSystem?: boolean
    }
}
export function transition({ plugins, components }: Config) {
    var myPlugins: string[] = [];
    if (plugins)
        Object.keys(plugins).forEach(plugin => {
            let p = plugin[0].toUpperCase() + plugin.slice(1) + 'Plugin';
            myPlugins.push(p);
        })
    var myComponents: string[] = [];
    if (components)
        Object.keys(components).forEach(component => {
            let p = component[0].toUpperCase() + component.slice(1) + 'Component';
            myComponents.push(p);
        })
    return { plugins: myPlugins, components: myComponents }
}