import { Injectable } from '@angular/core';
import { PluginDescriptor } from './plugin-descriptor.model';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    private pluginsRepository: Array<Partial<PluginDescriptor>>;


    constructor() {
        this.pluginsRepository = [];
    }


    lookup(query: Map<string, string>): LookupItem {
        // we start from provider, then going down to category
        // and then compare IDs
        const found = this.pluginsRepository.filter((p) =>
            query.has('provider') && p.provider === query.get('provider')
        ).filter((p) =>
            !query.has('category') || p.category === query.get('category')
        ).filter((p) => p.id === query.get('id'));

        if (found.length === 0) {
            throw new Error('No Plugin found. Please check your configuration.' + query.get('id'));
        }
        const item: LookupItem = {
            id: found[0].id,
            attributes: query,
            version: found[0].version,
            descriptor: found[0]
        };

        // take the first one.
        return item;
    }

    addPlugin(plugin: Partial<PluginDescriptor>): void {
        const found = this.pluginsRepository.find((p) => p.id === plugin.id);
        if (!found) {
            this.pluginsRepository.push(plugin);
        }
    }
}

export interface LookupItem {
    id: string;
    attributes: Map<string, string>;
    version: string;
    descriptor: Partial<PluginDescriptor>;
}
