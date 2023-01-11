import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-tabbable-header',
    templateUrl: './tabbable-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbableHeaderComponent {}
