import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginDescriptor } from './plugin-definition.model';

@Injectable({
    providedIn: 'root'
})
export class LookupService {
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
