import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-focusable-item',
    templateUrl: './focusable-item.component.html',
    styleUrls: ['./focusable-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FocusableItemComponent {}
