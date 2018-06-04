import {
    Component,
    Input,
    Output,
    OnInit,
    AfterContentInit,
    ViewChildren,
    QueryList,
    EventEmitter
} from '@angular/core';

export interface TreeRowObject {
    rowData: any[];
    children: TreeRowObject[];
    sublevelClass: string;
}

@Component({
    selector: 'fd-tree-child',
    template: `
    <li #treeChild class="fd-tree__item" role="treeitem">
      <div class="fd-tree__row">
        <div *ngFor="let cell of row.rowData; let i = index" [attr.data-index]="i" class="fd-tree__col"
             [ngClass]="{'fd-tree__col--control': i === 0}">
          <button (click)="toggleDisplayChildren()" *ngIf="row.children && i === 0"
                  class="fd-tree__control" aria-label="Expand" [attr.aria-pressed]="!hideChildren"></button>
          <ng-container *ngIf="typeOf(cell) === 'string'">
            {{cell}}
          </ng-container>
          <ng-container *ngIf="typeOf(cell) === 'object'">
            <ng-container *ngIf="cell.linkUrl">
              <ng-container *ngIf="cell.displayText">
                <!-- link with display text -->
                <a [attr.href]="cell.linkUrl" class="fd-has-font-weight-semi">{{cell.displayText}}</a>
              </ng-container>
              <ng-container *ngIf="!cell.displayText">
                <!-- link without display text -->
                <a [attr.href]="cell.linkUrl" class="fd-has-font-weight-semi">{{cell.linkUrl}}</a>
              </ng-container>
            </ng-container>
            <ng-container *ngIf="!cell.linkUrl">
              {{cell.displayText}}
            </ng-container>
          </ng-container>
        </div>
        <div class="fd-tree__col fd-tree__col--actions">
          <ng-container *ngIf="displayTreeActions">
            <fd-dropdown optionClass="button" [isContextualMenu]="true">
              <fd-dropdown-item (click)="editTreeItem(row)">Edit</fd-dropdown-item>
              <fd-dropdown-item (click)="deleteTreeItem(row)">Delete</fd-dropdown-item>
            </fd-dropdown>
          </ng-container>
        </div>
      </div>
      <ul *ngIf="row.children && row.children.length > 0" [ngClass]="{'is-hidden': hideChildren}"
          class="fd-tree__group" role="group">
        <fd-tree-child *ngFor="let child of row.children" [displayTreeActions]="displayTreeActions" 
                       [row]="child" [ngClass]="child.sublevelClass"></fd-tree-child>
      </ul>
    </li>
  `
})
export class TreeChild implements OnInit {
    @Input() row: TreeRowObject;

    @Input() hideChildren: boolean;

    @Input() displayTreeActions: boolean;

    @Output() editClicked: EventEmitter<any> = new EventEmitter<any>();

    @Output() deleteClicked: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        this.hideChildren = false;
    }

    toggleDisplayChildren(hideAll) {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        } else {
            this.hideChildren = !this.hideChildren;
        }
    }

    typeOf(variable) {
        let retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        } else if (typeof variable === 'object') {
            retVal = 'object';
        }

        return retVal;
    }

    editTreeItem(row) {
        this.editClicked.emit(row);
    }

    deleteTreeItem(row) {
        this.deleteClicked.emit(row);
    }
}

@Component({
    selector: 'fd-tree',
    template: `
    <div
         class="fd-tree fd-tree--header" *ngIf="headers.length > 0">
      <div class="fd-tree__row fd-tree__row--header">
        <div class="fd-tree__col fd-tree__col--control">
          <button (click)="toggleDisplayAll()" 
                  class="fd-tree__control" aria-label="Expand all" [attr.aria-pressed]="!hideAll"></button>
          {{headers[0]}}
        </div>
        <div class="fd-tree__col" *ngFor="let header of headers | slice:1">
          {{header}}
        </div>
        <div class="fd-tree__col fd-tree__col--actions"></div>
      </div>
    </div>
    <ul class="fd-tree" id="ENusD653" role="tree">
      <fd-tree-child (editClicked)="editClicked($event)" (deleteClicked)="deleteClicked($event)" 
                     [displayTreeActions]="displayTreeActions" *ngFor="let row of treeData" [row]="row"></fd-tree-child>
    </ul>
  `
})
export class TreeComponent implements OnInit, AfterContentInit {
    @Input() headers: string[];

    @Input() treeData: TreeRowObject[];

    @Input() hideAll: boolean;

    @Input() displayTreeActions: boolean;

    @Output() editRowClicked: EventEmitter<any> = new EventEmitter<any>();

    @Output() deleteRowClicked: EventEmitter<any> = new EventEmitter<any>();

    @ViewChildren(TreeChild) treeChildren: QueryList<TreeChild>;

    ngOnInit() {
        this.hideAll = false;
    }

    ngAfterContentInit() {
        if (this.treeData && this.treeData.length) {
            this.treeData.forEach(row => {
                this.getChildDepth(row, 0);
                this.handleEmptyTrailingCells(row); // handle empty cells for parents
            });
        }
    }

    toggleDisplayAll() {
        this.hideAll = !this.hideAll;
        this.treeChildren.forEach(child => {
            child.toggleDisplayChildren(this.hideAll);
        });
    }

    getChildDepth(row, depth) {
        if (depth > 0) {
            row.sublevelClass = 'fd-tree__group--sublevel-' + depth;
        }
        if (row.children) {
            row.children.forEach(child => {
                this.getChildDepth(child, depth + 1);
                this.handleEmptyTrailingCells(child); // handle empty cells for children
            });
        }
    }

    handleEmptyTrailingCells(row) {
        if (row && row.rowData && row.rowData.length && typeof row.rowData[0] === 'string') {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push('');
            }
        } else if (row && row.rowData && row.rowData.length && typeof row.rowData[0] === 'object') {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push({
                    displayText: ''
                });
            }
        }
    }

    editClicked(row) {
        this.editRowClicked.emit(row);
    }

    deleteClicked(row) {
        this.deleteRowClicked.emit(row);
    }
}
