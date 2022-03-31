import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class I18nDocsLoaderService {
    readonly typeDoc$ = this._getTypedoc();

    constructor(private httpClient: HttpClient) {}

    private _getTypedoc(): Observable<Record<string, any>> {
        return this.httpClient.get<Record<string, any>>('assets/typedoc/i18n/typedoc.json').pipe(shareReplay(1));
    }
}
