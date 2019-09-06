import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiDocsService {

    readonly BASE_URL = 'assets/typedoc/';

    constructor(private httpClient: HttpClient) {}

    getComponentHtml(component: string): Observable<string> {
        component = component.toLocaleLowerCase() + '.html';
        return this.httpClient.get<string>(this.BASE_URL + 'classes/' + component, { responseType: 'text' as 'json'});
    }
}
