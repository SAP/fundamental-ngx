import {
    Injectable,
    OnDestroy
} from '@angular/core';
import {
    DescriptorsModule,
    PluginDescriptor
} from './plugin-descriptor.model';

@Injectable({ providedIn: 'root' })
export class LookupService implements OnDestroy {
    private readonly pluginsRepository: Array<Partial<PluginDescriptor>> = [];

    lookup(query: Map<string, string>, isRoute: boolean = false): LookupItem {
        const predicate = (record: Record<string, any>): boolean => {
            let match = true;
            query.forEach((value, key) => {
                match = match && record[key] === value;
            });
            return match;
        };
        const plugin = this.pluginsRepository.find((_plugin) => {
            return predicate(_plugin) || _plugin.modules.some(predicate);
        });
        let module;
        if (isRoute) {
            module = plugin.modules.find(predicate);
        }
        if (!plugin || (!module && isRoute)) {
            throw new Error('No Plugin found. Please check your configuration.');
        }
        const item: LookupItem = {
            id: plugin.name,
            attributes: query,
            version: plugin.version,
            descriptor: plugin,
            module: module
        };

        // take the first one.
        return item;
    }

    addPlugin(plugin: Partial<PluginDescriptor>): void {
        const found = this.pluginsRepository.find((p) => p.name === plugin.name);
        if (!found) {
            this.pluginsRepository.push(plugin);
        }
    }

    ngOnDestroy(): void {
        this.pluginsRepository.length = 0;
    }
}

export interface LookupItem {
    id: string;
    attributes: Map<string, string>;
    version: string;
    descriptor: Partial<PluginDescriptor>;
    module?: DescriptorsModule;
}
