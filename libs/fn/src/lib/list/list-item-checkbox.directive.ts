import { AfterViewInit, Directive, Inject, OnDestroy, Optional, TemplateRef } from '@angular/core';
import { TemplateRefDirective } from '@fundamental-ngx/fn/utils';
import { FN_LIST_CHECKBOX } from './list.tokens';
import { ListItemComponent } from './list-item/list-item.component';

@Directive({
    selector: '[fnListItemCheckbox]',
    providers: [
        {
            provide: FN_LIST_CHECKBOX,
            useExisting: ListItemCheckboxDirective
        }
    ]
})
export class ListItemCheckboxDirective
    extends TemplateRefDirective<CheckboxContext>
    implements AfterViewInit, OnDestroy
{
    private listItemElement?: HTMLElement;

    constructor(
        @Optional() @Inject(ListItemComponent) private listItem: ListItemComponent,
        readonly templateRef: TemplateRef<CheckboxContext>
    ) {
        super(templateRef);
        if (listItem) {
            this.listItemElement = listItem.elementRef().nativeElement;
        }
    }

    ngAfterViewInit(): void {
        this.listItemElement?.classList.add('fn-list__item--has-checkbox');
    }

    ngOnDestroy(): void {
        this.listItemElement?.classList.remove('fn-list__item--has-checkbox');
    }
}

export interface CheckboxContext {
    /**
     * Current state of the item. Whether or not it is selected
     */
    $implicit: boolean;
    /**
     * Update current state
     */
    update: (newVal: boolean) => void;
}
