import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'fd-card-bar',
    templateUrl: './card-bar.component.html',
    styleUrls: ['./card-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: { class: 'fd-card-bar-example' }
})
export class CardBarComponent implements OnInit {
    /** value in percentage, minimum 0, maximum 100 */
    @Input() value = 0;

    /** bar hex color */
    @Input() bgColor: string = null;

    /** color name */
    @Input() color = 'Information';

    ngOnInit(): void {
        if (this.color === 'Information') {
            this.bgColor = '#1866b4';
        }
        if (this.color === 'Warning') {
            this.bgColor = '#DA5A1B';
        }
        if (this.color === 'Critical') {
            this.bgColor = '#C67A0C';
        }
        if (this.color === 'Success') {
            this.bgColor = '#358A4D';
        }
    }
}
