import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-data-source-header',
    templateUrl: './data-source-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataSourceHeaderComponent {}
