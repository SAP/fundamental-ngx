import { OnInit, AfterContentInit, QueryList, EventEmitter } from '@angular/core';
import { TreeRowObject } from './tree-row-object.model';
import { TreeChildComponent } from './tree-child.component';
export declare class TreeComponent implements OnInit, AfterContentInit {
    headers: string[];
    treeData: TreeRowObject[];
    hideAll: boolean;
    displayTreeActions: boolean;
    editRowClicked: EventEmitter<any>;
    deleteRowClicked: EventEmitter<any>;
    treeChildren: QueryList<TreeChildComponent>;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    toggleDisplayAll(): void;
    getChildDepth(row: any, depth: any): void;
    handleEmptyTrailingCells(row: any): void;
    editClicked(row: any): void;
    deleteClicked(row: any): void;
}
