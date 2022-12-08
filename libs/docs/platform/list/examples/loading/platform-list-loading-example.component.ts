import { Component, ChangeDetectionStrategy } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { ListDataSource, DataProvider } from '@fundamental-ngx/platform/shared';

export class ListDataProvider extends DataProvider<any> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<any[]> {
        return new Observable();
    }
}
@Component({
    selector: 'fdp-platform-list-loading-example',
    templateUrl: './platform-list-loading-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformListLoadingExampleComponent {
    _dataSource = new ListDataSource<any>(new ListDataProvider());
}
