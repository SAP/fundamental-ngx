import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-message-popover-header',
    templateUrl: './message-popover-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagePopoverHeaderComponent {}
