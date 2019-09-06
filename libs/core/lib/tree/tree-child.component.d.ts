import { EventEmitter, OnInit } from '@angular/core';
import { TreeRowObject } from './tree-row-object.model';
export declare class TreeChildComponent implements OnInit {
    row: TreeRowObject;
    hideChildren: boolean;
    displayTreeActions: boolean;
    editClicked: EventEmitter<any>;
    deleteClicked: EventEmitter<any>;
    ngOnInit(): void;
    toggleDisplayChildren(hideAll?: any): void;
    typeOf(variable?: any): any;
    editTreeItem(row?: any): void;
    deleteTreeItem(row?: any): void;
}
