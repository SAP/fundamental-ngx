export interface PluginDescriptor {
    provider: string
    version: string;
    sinceVersion: string;
    untilVersion: string;
    remoteEntry: string;
    remoteName: string;
    exposedModule: string;
    displayName: string;
    componentName: string;
    type: PluginType;
    category: string;
    hasRoutes: boolean;
}


export enum PluginType {
    Action = 1,
    Page,
    Widget,
    Service

}
