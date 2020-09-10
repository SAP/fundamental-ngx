import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginDescriptor } from './plugin-descriptor.model';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
    private pluginsRepository: Array<PluginDescriptor>;


    constructor() {
        this.pluginsRepository = [];
    }


    lookup(query: Map<string, string>): Observable<LookupItem[]> {

        return null;
    }


}

export interface LookupItem {
    id: string;
    attributes: Map<string, string>;
    version: string;
    descriptor: PluginDescriptor;
}
