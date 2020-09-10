export interface PluginDescriptor {
    id: string;
    provider: string
    version: string;
    sinceVersion: string;
    untilVersion: string;
    remoteEntry: string;
    remoteName: string;
    exposedModule: string;
    displayName: string;
    componentName: string;

    type: Scope;
    category: string;
    hasRoutes: boolean;
    changeNotes: string;
}


export enum Scope {
    Application = 1,
    Page
}

