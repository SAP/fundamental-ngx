import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { TreeRowObject } from './tree-row-object.model';

@Component({
    selector: 'fd-tree-child',
    templateUrl: './tree-child.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeChildComponent implements OnInit {
    /** @hidden */
    @Input() row: TreeRowObject;

    /** @hidden */
    @Input() hideChildren: boolean;

    /** @hidden */
    @Input() displayTreeActions: boolean;

    /** @hidden */
    @Output() editClicked: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    @Output() deleteClicked: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    ngOnInit(): void {
        this.hideChildren = false;
    }

    /** @hidden */
    toggleDisplayChildren(hideAll?): void {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        } else {
            this.hideChildren = !this.hideChildren;
        }
    }

    /** @hidden */
    typeOf(variable?): string {
        let retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        } else if (typeof variable === 'object') {
            retVal = 'object';
        }

        return retVal;
    }

    /** @hidden */
    editTreeItem(row?): void {
        if (row) {
            this.editClicked.emit(row);
        }
    }

    /** @hidden */
    deleteTreeItem(row?): void {
        if (row) {
            this.deleteClicked.emit(row);
        }
    }
}
