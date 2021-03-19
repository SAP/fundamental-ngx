import {
    AngularIvyComponentDescriptor, DescriptorsModule,
    PluginDescriptor
} from './lookup/plugin-descriptor.model';

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

type Factory = () => any;

interface Container {
    init(shareScope: string): void;
    get(module: string): Factory;
}

interface ModuleMaps {
    [key: string]: Promise<void>;
}

const moduleMap: ModuleMaps = {};

function loadRemoteEntry(remoteEntry: string): Promise<void> {
    const modulePromise = moduleMap[remoteEntry];

    if (modulePromise instanceof Promise) {
        return modulePromise;
    }

    // if we haven't a module promise we should create one
    moduleMap[remoteEntry] = new Promise<any>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = remoteEntry;

        script.onerror = () => {
            reject(
                new Error(
                    `ModuleRemoteLoadingError: Can't fetch a remote module from ${remoteEntry}`
                )
            );
        };

        script.onload = () => {
            resolve(); // window is the global namespace
        };

        document.body.append(script);
    });

    return moduleMap[remoteEntry];
}

async function lookupExposedModule<T>(remoteName: string, exposedModule: string): Promise<T> {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');

    const container = window[remoteName] as Container; // or get the container somewhere else

    const rejectWithError = () => {
        return Promise.reject(
            new Error(
                `ModuleExposedResolveError: Can't resolve module ${remoteName} from exposed module ${exposedModule}`
            )
        );
    }

    // Check if a container is an object
    const isContainerDefined = Object.prototype.toString.call(container) === '[object Object]';

    if (!isContainerDefined) {
        return rejectWithError();
    }

    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);

    let factory;

    try {
        factory = await container.get(exposedModule);
    } catch {
        return rejectWithError();
    }

    // if var factory is not a function we have a trouble with a provided module
    if (typeof factory !== 'function') {
        return rejectWithError();
    }

    const Module = factory();
    return Module as T;
}

export async function loadRemoteModule<T = any>(options: Partial<PluginDescriptor>, module: DescriptorsModule): Promise<T> {
    await loadRemoteEntry(options.uri);

    return await lookupExposedModule<T>(options.name, (module as AngularIvyComponentDescriptor).exposedModule);
}
