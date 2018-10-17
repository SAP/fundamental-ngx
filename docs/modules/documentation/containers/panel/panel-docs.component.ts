import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-panel',
    templateUrl: './panel-docs.component.html'
})
export class PanelDocsComponent implements OnInit {
    panelHtml = `<fd-panel>
  <fd-panel-header>
    <fd-panel-head>
      <fd-panel-title>Panel Title</fd-panel-title>
      <fd-panel-description>Panel Description</fd-panel-description>
    </fd-panel-head>
    <fd-panel-actions>
      <button fd-button [size]="'s'" [glyph]="'add'">Add New Item</button>
    </fd-panel-actions>
  </fd-panel-header>
  <fd-panel-filters>
    <fd-popover [isDropdown]="true">
        Color
    </fd-popover>
    <fd-popover [isDropdown]="true">
        Size
    </fd-popover>
  </fd-panel-filters>
  <fd-panel-filters>
    <span class="fd-tag" role="button">Blue</span>
    <span class="fd-tag" role="button">Small</span>
    <button fd-modal-button-secondary size="s">Clear All</button>
  </fd-panel-filters>
  <fd-panel-body>
    Panel Content
  </fd-panel-body>
  <fd-panel-footer>
    Panel Footer
  </fd-panel-footer>
</fd-panel>`;

    tableBleedHtml = `<fd-panel>
  <fd-panel-body [bleed]="true">
    <fd-table>
      <fd-table-header>
        <th *ngFor="let header of tableHeaders">
          {{header}}
        </th>
      </fd-table-header>
      <fd-table-body>
        <tr *ngFor="let row of tableData">
          <td *ngFor="let cell of row.rowData">
            {{cell}}
          </td>
        </tr>
      </fd-table-body>
    </fd-table>
  </fd-panel-body>
</fd-panel>`;

    tableHeaders = ['Column Header 1', 'Column Header 2', 'Column Header 3', 'Column Header 4'];
    tableData = [
        {
            rowData: ['Data 1', 'Data 2', 'Data 3', 'Data 4']
        },
        {
            rowData: ['Data 5', 'Data 6', 'Data 7', 'Data 8']
        }
    ];

    defaultPanelGridHtml = `<fd-panel-grid>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    nogapPanelGridHtml = `<fd-panel-grid [col]="2" [nogap]="true">
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    twoColumnsPanelGridHtml = `<fd-panel-grid [col]="2">
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    columnSpanPanelGridHtml = `<fd-panel-grid [col]="6">
  <fd-panel [columnSpan]="2" [rowSpan]="2">
    <fd-panel-body>
      Panel Content with span 2
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel [columnSpan]="2">
    <fd-panel-body>
      Panel Content with span 2
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel [columnSpan]="4">
    <fd-panel-body>
      Panel Content with span 4
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel [columnSpan]="5">
    <fd-panel-body>
      Panel Content with span 5
    </fd-panel-body>
  </fd-panel>
  <fd-panel>
    <fd-panel-body>
      Panel Content
    </fd-panel-body>
  </fd-panel>
  <fd-panel [columnSpan]="6">
    <fd-panel-body>
      Panel Content with span 6
    </fd-panel-body>
  </fd-panel>
</fd-panel-grid>`;

    ngOnInit() {}
}
