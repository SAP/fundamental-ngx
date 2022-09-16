import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-message-strip-header',
    templateUrl: './message-strip-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageStripHeaderComponent {}
