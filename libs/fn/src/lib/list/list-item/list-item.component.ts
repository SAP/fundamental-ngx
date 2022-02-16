import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import {
    canAssignAdditionalClasses,
    hasTabIndex,
    SelectableItemToken,
    SelectionService
} from '@fundamental-ngx/fn/cdk';
import { FN_LIST_ACTIONS, FN_LIST_CHECKBOX, FN_LIST_END, FN_LIST_ICON, FN_LIST_TITLE } from '../list.tokens';
import { coerceBoolean, TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';
import { CheckboxContext } from '../list-item-checkbox.directive';

const mixinBaseListItem = hasTabIndex(canAssignAdditionalClasses(Object));

@Component({
    selector: 'fn-list-item, [fn-list-item]',
    templateUrl: './list-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fn-list__item]': 'true'
    }
})
export class ListItemComponent extends mixinBaseListItem {
    @Input()
    @HostBinding('class.fn-list__item--info-bar')
    @coerceBoolean
    infoBar!: boolean;

    @ContentChild(FN_LIST_CHECKBOX)
    checkboxProvider?: TemplateRefProviderToken<CheckboxContext>;
    @ContentChild(FN_LIST_ICON)
    iconProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_TITLE)
    titleProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_ACTIONS)
    actionsProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_END)
    endProvider?: TemplateRefProviderToken<void>;

    constructor(
        @Optional() private selectionService: SelectionService,
        @Optional() @Inject(SelectableItemToken) private selectableItem: SelectableItemToken,
        private _elementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    get checkboxContext(): CheckboxContext {
        return {
            $implicit: this.selectableItem?.getSelected(),
            update: (selected) => this.toggleItemSelection(selected)
        };
    }

    public elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    private toggleItemSelection(isSelected: boolean): void {
        if (isSelected) {
            this.selectionService?.selectItem(this.selectableItem);
        } else {
            this.selectionService?.deselectItem(this.selectableItem);
        }
    }
}
