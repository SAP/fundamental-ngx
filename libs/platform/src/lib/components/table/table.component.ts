import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'table[fpd-table]',
    exportAs: 'fdp-table',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }

}
