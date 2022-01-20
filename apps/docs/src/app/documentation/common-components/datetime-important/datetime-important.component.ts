import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'fd-datetime-important',
    templateUrl: './datetime-important.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimeImportantComponent {
    @Input()
    componentName: string;
}
