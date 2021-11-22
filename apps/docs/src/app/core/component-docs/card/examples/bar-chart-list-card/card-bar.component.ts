import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';

export type CardBarStatus = 'information' | 'warning' | 'critical' | 'success';

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

    /** status name: information, warning, critical, success */
    @Input() status: CardBarStatus = 'information';

    /** variable for i18n */
    @Input() labeli18n: string = this.status;
}
