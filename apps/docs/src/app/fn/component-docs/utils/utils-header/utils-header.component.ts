import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-utils-header',
    templateUrl: './utils-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilsHeaderComponent {}
