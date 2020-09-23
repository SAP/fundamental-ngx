export interface PluginDescriptor {
    name: string;
    provider: string
    version: string;
    sinceVersion: string;
    untilVersion: string;
    remoteEntry: string;
    remoteName: string;
    remoteRoute: string;
    exposedModule: string;
    displayName: string;
    componentName: string;

    type: Scope;
    category: string;
    hasRoutes: boolean;
    changeNotes: string;
}


/**
 * The idea behind the scope is that there are components that are instantiated at the time we use Page launcher.
 * But there could be a situation, where we need to register a PLUGIN at the bootstrap at the lauch time, there we
 * have scope Application.
 * Not implemented yet default value should be as Page
 */
export enum Scope {
    Application = 1,
    Page
}

