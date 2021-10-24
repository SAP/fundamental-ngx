import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, OnInit } from '@angular/core';

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

    /** color name: information, warning, critical, success */
    @Input() color: string = null;
}
