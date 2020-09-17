import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fdp-column',
    templateUrl: './table-column.component.html',
    styleUrls: ['./table-column.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }

}
