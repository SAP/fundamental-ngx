import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-message-toast-header',
    templateUrl: './message-toast-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastHeaderComponent {}
