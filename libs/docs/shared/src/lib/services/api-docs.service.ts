import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CURRENT_LIB, Libraries } from '../utilities/libraries';

@Injectable()
export class ApiDocsService {
    readonly BASE_URL = 'assets/typedoc/';

    constructor(private httpClient: HttpClient, @Inject(CURRENT_LIB) private currentLib: Libraries) {}

    getComponentHtml(component: string): Observable<string> {
        component = component.toLocaleLowerCase() + '.html';
        const url = this.buildUrl(this.BASE_URL, this.currentLib || 'core', 'classes', component);
        return this.httpClient.get<string>(url, {
            responseType: 'text' as 'json'
        });
    }

    private buildUrl(...tokens: string[]): string {
        return tokens.join('/').replace(/\/+/g, '/');
    }
}
