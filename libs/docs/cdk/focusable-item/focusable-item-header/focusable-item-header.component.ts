import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-focusable-item-header',
    templateUrl: './focusable-item-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FocusableItemHeaderComponent {}
