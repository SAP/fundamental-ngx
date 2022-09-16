import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-card-bar',
    templateUrl: './card-bar.component.html',
    styleUrls: ['./card-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: { class: 'fd-card-bar-example' }
})
export class CardBarComponent {
    /** value in percentage, minimum 0, maximum 100 */
    @Input() value = 0;

    /** bar hex color */
    @Input() color = '#1866b4';
}
