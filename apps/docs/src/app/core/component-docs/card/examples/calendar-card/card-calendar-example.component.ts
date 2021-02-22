import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-calendar-example',
    templateUrl: 'card-calendar-example.component.html',
    styleUrls: ['./card-calendar-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCalendarExampleComponent {}
