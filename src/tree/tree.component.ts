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
    templateUrl: './tree-child.component.html'
})
export class TreeChildComponent implements OnInit {
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
    templateUrl: './tree.component.html'
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
