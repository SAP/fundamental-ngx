import { PluginDescriptor } from './lookup/plugin-descriptor.model';

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

type Factory = () => any;

interface Container {
    init(shareScope: string): void;
    get(module: string): Factory;
}

const moduleMap = {};

function loadRemoteEntry(remoteEntry: string): Promise<void> {
    return new Promise<any>((resolve, reject) => {

        if (moduleMap[remoteEntry]) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = remoteEntry;

        script.onerror = reject;

        script.onload = () => {
            moduleMap[remoteEntry] = true;
            resolve(); // window is the global namespace
        };
        document.body.append(script);
    });
}

async function lookupExposedModule<T>(remoteName: string, exposedModule: string): Promise<T> {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[remoteName] as Container; // or get the container somewhere else
    // Initialize the container, it may provide shared modules

    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(exposedModule);
    const Module = factory();
    return Module as T;
}


export async function loadRemoteModule<T = any>(options: Partial<PluginDescriptor>): Promise<T> {
    await loadRemoteEntry(options.remoteEntry);
    return await lookupExposedModule<T>(options.remoteName, options.exposedModule);
}
