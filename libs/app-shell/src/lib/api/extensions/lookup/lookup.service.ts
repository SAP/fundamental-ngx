import {
    Injectable,
    OnDestroy
} from '@angular/core';
import { PluginDescriptor } from './plugin-descriptor.model';

@Injectable({ providedIn: 'root' })
export class LookupService implements OnDestroy {
    private readonly pluginsRepository: Array<Partial<PluginDescriptor>> = [];

    lookup(query: Map<string, string>): LookupItem {
        const predicate = (record: Record<string, any>): boolean => {
            let match = true;
            query.forEach((value, key) => {
                match = match && record[key] === value;
            });
            return match;
        };
        const found = this.pluginsRepository.filter((plugin) => {
            return  predicate(plugin) || plugin.modules.some(predicate);
        });

        if (found.length === 0) {
            throw new Error('No Plugin found. Please check your configuration.');
        }
        const item: LookupItem = {
            id: found[0].name,
            attributes: query,
            version: found[0].version,
            descriptor: found[0]
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
}
