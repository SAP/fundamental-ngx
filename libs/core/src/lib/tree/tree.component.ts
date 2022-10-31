import {
    AfterContentInit,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';

import { TreeRowObject } from './tree-row-object.model';
import { TreeChildComponent } from './tree-child.component';

@Component({
    selector: 'fd-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, AfterContentInit {
    /** @hidden */
    @Input() headers: string[];

    /** @hidden */
    @Input() treeData: TreeRowObject[];

    /** @hidden */
    @Input() hideAll: boolean;

    /** @hidden */
    @Input() displayTreeActions: boolean;

    /** @hidden */
    @Output() editRowClicked: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    @Output() deleteRowClicked: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    @ViewChildren(TreeChildComponent) treeChildren: QueryList<TreeChildComponent>;

    /** @hidden */
    ngOnInit(): void {
        this.hideAll = false;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.treeData && this.treeData.length) {
            this.treeData.forEach((row) => {
                this.getChildDepth(row, 0);
                this.handleEmptyTrailingCells(row); // handle empty cells for parents
            });
        }
    }

    /** @hidden */
    toggleDisplayAll(): void {
        this.hideAll = !this.hideAll;
        this.treeChildren.forEach((child) => {
            child.toggleDisplayChildren(this.hideAll);
        });
    }

    /** @hidden */
    getChildDepth(row, depth): void {
        if (depth > 0) {
            row.sublevelClass = 'fd-tree__group--sublevel-' + depth;
        }
        if (row.children) {
            row.children.forEach((child) => {
                this.getChildDepth(child, depth + 1);
                this.handleEmptyTrailingCells(child); // handle empty cells for children
            });
        }
    }

    /** @hidden */
    handleEmptyTrailingCells(row): void {
        if (
            row &&
            row.rowData &&
            row.rowData.length &&
            typeof row.rowData[0] !== 'object' &&
            this.headers &&
            this.headers.length
        ) {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push('');
            }
        } else if (
            row &&
            row.rowData &&
            row.rowData.length &&
            typeof row.rowData[0] === 'object' &&
            this.headers &&
            this.headers.length
        ) {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push({
                    displayText: ''
                });
            }
        }
    }

    /** @hidden */
    editClicked(row): void {
        this.editRowClicked.emit(row);
    }

    /** @hidden */
    deleteClicked(row): void {
        this.deleteRowClicked.emit(row);
    }
}
