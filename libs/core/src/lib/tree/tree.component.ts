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
    @Input() headers: string[];

    @Input() treeData: TreeRowObject[];

    @Input() hideAll: boolean;

    @Input() displayTreeActions: boolean;

    @Output() editRowClicked: EventEmitter<any> = new EventEmitter<any>();

    @Output() deleteRowClicked: EventEmitter<any> = new EventEmitter<any>();

    @ViewChildren(TreeChildComponent) treeChildren: QueryList<TreeChildComponent>;

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

    editClicked(row) {
        this.editRowClicked.emit(row);
    }

    deleteClicked(row) {
        this.deleteRowClicked.emit(row);
    }
}
