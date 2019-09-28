import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { TreeRowObject } from './tree-row-object.model';

@Component({
    selector: 'fd-tree-child',
    templateUrl: './tree-child.component.html',
    encapsulation: ViewEncapsulation.None
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

    toggleDisplayChildren(hideAll?) {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        } else {
            this.hideChildren = !this.hideChildren;
        }
    }

    typeOf(variable?) {
        let retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        } else if (typeof variable === 'object') {
            retVal = 'object';
        }

        return retVal;
    }

    editTreeItem(row?) {
        if (row) {
            this.editClicked.emit(row);
        }
    }

    deleteTreeItem(row?) {
        if (row) {
            this.deleteClicked.emit(row);
        }
    }
}
