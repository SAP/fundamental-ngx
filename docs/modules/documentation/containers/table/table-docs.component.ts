import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html'
})
export class TableDocsComponent implements OnInit {
    tableRows: any;

    static schema: Schema = {
        properties: {
            state: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;
    data: any = {
        state: {
            disabled: false
        }
    };

    tableHtml = `<fd-table>
  <fd-table-header>
    <th>Column 1</th>
    <th>Column 2</th>
    <th>Column 3</th>
    <th>Date</th>
    <th>Type</th>
  </fd-table-header>
  <fd-table-body>
    <tr *ngFor="let row of tableRows">
      <td class="fd-has-font-weight-semi"><a href="#">{{row.column1}}</a></td>
      <td>{{row.column2}}</td>
      <td>{{row.column3}}</td>
      <td>{{row.date}}</td>
      <td><fd-icon [glyph]="row.type"></fd-icon></td>
    </tr>
  </fd-table-body>
</fd-table>`;

    tableJson = `[
  {
    column1: 'Row 1',
    column2: 'Row 1',
    column3: 'Row 1',
    date: '09-07-18',
    type: 'search'
  },
  {
    column1: 'Row 2',
    column2: 'Row 2',
    column3: 'Row 2',
    date: '09-07-18',
    type: 'cart'
  },
  {
    column1: 'Row 3',
    column2: 'Row 3',
    column3: 'Row 3',
    date: '09-07-18',
    type: 'calendar'
  },
  {
    column1: 'Row 4',
    column2: 'Row 4',
    column3: 'Row 4',
    date: '09-07-18',
    type: 'search'
  },
  {
    column1: 'Row 5',
    column2: 'Row 5',
    column3: 'Row 5',
    date: '09-07-18',
    type: 'search'
  }
]`;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {
        this.tableRows = [
            {
                column1: 'Row 1',
                column2: 'Row 1',
                column3: 'Row 1',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 2',
                column2: 'Row 2',
                column3: 'Row 2',
                date: '09-07-18',
                type: 'cart'
            },
            {
                column1: 'Row 3',
                column2: 'Row 3',
                column3: 'Row 3',
                date: '09-07-18',
                type: 'calendar'
            },
            {
                column1: 'Row 4',
                column2: 'Row 4',
                column3: 'Row 4',
                date: '09-07-18',
                type: 'search'
            },
            {
                column1: 'Row 5',
                column2: 'Row 5',
                column3: 'Row 5',
                date: '09-07-18',
                type: 'search'
            }
        ];
    }
}
