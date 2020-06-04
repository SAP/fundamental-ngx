import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiDocsService {
    readonly BASE_URL = 'assets/typedoc/';

    constructor(private httpClient: HttpClient, private router: Router) {}

    getComponentHtml(component: string): Observable<string> {
        const regex = /(\/[^\/\s]+\/)/;
        const currentLib = regex.exec(this.router.url)[0];
        component = component.toLocaleLowerCase() + '.html';
        if (currentLib !== null) {
            return this.httpClient.get<string>(this.BASE_URL + currentLib + 'classes/' + component, {
                responseType: 'text' as 'json'
            });
        } else {
            return this.httpClient.get<string>(this.BASE_URL + '/core/classes/' + component, {
                responseType: 'text' as 'json'
            });
        }
    }
}
