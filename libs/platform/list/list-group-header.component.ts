import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ListGroupHeaderDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import { BaseListItem, LIST_ITEM_TYPE } from './base-list-item';

let nextListGrpHeaderId = 0;

@Component({
    selector: 'fdp-list-group-header',
    template: ` <div
        #listItem
        fd-list-group-header
        [attr.aria-labelledby]="ariaLabelledBy"
        [attr.aria-label]="ariaLabel"
        [attr.id]="id"
        role="group"
        [tabindex]="0"
    >
        <span fd-list-title>{{ groupHeaderTitle }}</span>
        <ng-content></ng-content>
    </div>`,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => ListGroupHeaderComponent) }],
    host: {
        role: 'none'
    },
    imports: [ListGroupHeaderDirective, ListTitleDirective]
})
export class ListGroupHeaderComponent extends BaseListItem implements OnInit {
    /** Displays list group header title */
    @Input()
    groupHeaderTitle?: string;

    /** @hidden */
    _type = LIST_ITEM_TYPE.HEADER;

    /**
     * @hidden
     * Initialization of the list header component
     */
    ngOnInit(): void {
        this.id = `fdp-list-${nextListGrpHeaderId++}`;
    }
}
