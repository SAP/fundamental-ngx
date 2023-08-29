import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-table-activable-example',
    templateUrl: './table-activable-example.component.html',
    standalone: true,
    imports: [FocusableGridDirective, TableModule, NgFor, LinkComponent]
})
export class TableActivableExampleComponent implements OnInit {
    tableRows: any[];

    ngOnInit(): void {
        this.tableRows = [
            {
                column1: {
                    text: 'Clicking on any cell'
                },
                column2: {
                    text: 'On This Row'
                },
                column3: {
                    text: 'Will Cause'
                },
                column4: {
                    text: 'Highlight of whole row'
                },
                date: {
                    text: '09-07-18'
                },
                activable: true,
                hoverable: true
            },
            {
                column1: {
                    text: 'Clicking on cell',
                    activable: true
                },
                column2: {
                    text: 'On This Row',
                    activable: true
                },
                column3: {
                    text: 'Will Cause',
                    activable: true
                },
                column4: {
                    text: 'Highlight of cell',
                    activable: true
                },
                date: {
                    text: '09-08-18',
                    activable: true
                }
            },
            {
                column1: {
                    text: 'Hovering On Any Cell',
                    hoverable: true
                },
                column2: {
                    text: 'Will Change',
                    hoverable: true
                },
                column3: {
                    text: 'Background',
                    hoverable: true
                },
                column4: {
                    text: 'Of that cell',
                    hoverable: true
                },
                date: {
                    text: '02-14-18',
                    hoverable: true
                }
            },
            {
                column1: {
                    text: 'Hovering on Any Cell'
                },
                column2: {
                    text: 'On This Row'
                },
                column3: {
                    text: 'Will Change'
                },
                column4: {
                    text: 'Background of Whole Row'
                },
                date: {
                    text: '12-30-17'
                },
                hoverable: true
            }
        ];
    }
}
