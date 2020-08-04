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
    @Input() row: TreeRowObject;

    @Input() hideChildren: boolean;

    @Input() displayTreeActions: boolean;

    @Output() editClicked: EventEmitter<any> = new EventEmitter<any>();

    @Output() deleteClicked: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit(): void {
        this.hideChildren = false;
    }

    toggleDisplayChildren(hideAll?): void {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        } else {
            this.hideChildren = !this.hideChildren;
        }
    }

    typeOf(variable?): string {
        let retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        } else if (typeof variable === 'object') {
            retVal = 'object';
        }

        return retVal;
    }

    editTreeItem(row?): void {
        if (row) {
            this.editClicked.emit(row);
        }
    }

    deleteTreeItem(row?): void {
        if (row) {
            this.deleteClicked.emit(row);
        }
    }
}
