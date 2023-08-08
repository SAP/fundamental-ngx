import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { BaseListItem } from './base-list-item';

let nextListGrpHeaderId = 0;

@Component({
    selector: 'fdp-list-group-header',
    template: ` <li #listItem fd-list-group-header [attr.id]="id" role="option" [tabindex]="0">
        <span fd-list-title>{{ groupHeaderTitle }}</span>
        <ng-content></ng-content>
    </li>`,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => ListGroupHeaderComponent) }]
})
export class ListGroupHeaderComponent extends BaseListItem implements OnInit {
    /** Displays list group header title */
    @Input()
    groupHeaderTitle?: string;

    /**
     * @hidden
     * Initialization of the list header component
     */
    ngOnInit(): void {
        this.id = `fdp-list-${nextListGrpHeaderId++}`;
    }
}
