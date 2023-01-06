import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-initial-focus-header',
    templateUrl: './initial-focus-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitialFocusHeaderComponent {}
