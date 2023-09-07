import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { CURRENT_COMPONENT } from '../tokens/current-component.token';
import { CURRENT_LIB } from '../utilities/libraries';

@Injectable()
export class CompodocService {
    private _httpClient = inject(HttpClient);
    private _currentComponent = inject(CURRENT_COMPONENT);
    private _currentLib = inject(CURRENT_LIB);
    private _docsJsonUrl = `assets/compodoc/${this._currentLib}/${this._currentComponent}/docs.json`;
    private _docsJson = this._httpClient.get<Array<any>>(this._docsJsonUrl).pipe(shareReplay(1));

    get docsJson$(): Observable<Array<any>> {
        return this._docsJson;
    }
}
