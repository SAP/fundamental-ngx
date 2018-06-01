import { Component, Input } from '@angular/core';

export interface TableRowObject {
  rowData: any[];
}

@Component({
  selector: 'fd-table',
  template: `
    <table class="fd-table">
      <thead>
        <tr>
          <th *ngFor="let header of headers">
            {{header}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let tableRow of tableData">
          <td *ngFor="let cell of tableRow.rowData">
            <ng-container *ngIf="typeOf(cell) === 'string'">
              {{cell}}
            </ng-container>
            <ng-container *ngIf="typeOf(cell) === 'object'">
              <img *ngIf="cell.imageUrl" [src]="cell.imageUrl">
              <a [href]="cell.linkUrl" *ngIf="cell.linkUrl && !cell.displayText" class="fd-has-font-weight-semi">{{cell.linkUrl}}</a>
              <a [href]="cell.linkUrl" *ngIf="cell.linkUrl && cell.displayText" class="fd-has-font-weight-semi">{{cell.displayText}}</a>
              <ng-container *ngIf="cell.displayText && !cell.linkUrl">{{cell.displayText}}</ng-container>
            </ng-container>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class Table {
  @Input() headers: string[];

  @Input() tableData: TableRowObject[];

  typeOf(variable) {
    let retVal;
    if (typeof variable === 'string') {
      retVal = 'string';
    } else if (typeof variable === 'object') {
      retVal = 'object';
    }

    return retVal;
  }
}
