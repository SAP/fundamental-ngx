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
import {
    FN_LIST_ACTIONS,
    FN_LIST_CHECKBOX,
    FN_LIST_POSTFIX,
    FN_LIST_ICON,
    FN_LIST_PREFIX,
    FN_LIST_TITLE
} from '../list.tokens';
import { coerceBoolean, TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';
import { CheckboxContext } from '../list-item-checkbox.directive';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ListComponent } from '../list/list.component';

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

    @Input()
    @HostBinding('disabled')
    @HostBinding('class.is-disabled')
    @HostBinding('attr.aria-disabled')
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(isDisabled: BooleanInput) {
        this._disabled = coerceBooleanProperty(isDisabled);
        this.adaptSelectableItem();
    }

    @Input()
    @HostBinding('readonly')
    @HostBinding('class.is-readonly')
    get readonly(): boolean {
        return this._readonly;
    }

    set readonly(isReadonly: BooleanInput) {
        this._readonly = coerceBooleanProperty(isReadonly);
        this.adaptSelectableItem();
    }

    @ContentChild(FN_LIST_CHECKBOX)
    checkboxProvider?: TemplateRefProviderToken<CheckboxContext>;
    @ContentChild(FN_LIST_PREFIX)
    prefixProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_ICON)
    iconProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_TITLE)
    titleProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_ACTIONS)
    actionsProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_POSTFIX)
    endProvider?: TemplateRefProviderToken<void>;

    private _disabled = false;
    private _readonly = false;

    constructor(
        @Optional() private selectionService: SelectionService,
        @Optional() @Inject(SelectableItemToken) private selectableItem: SelectableItemToken,
        @Inject(ListComponent) private listComponent: ListComponent,
        private _elementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    get byline(): boolean {
        return this.listComponent.byline;
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

    private adaptSelectableItem(): void {
        if (this.selectableItem) {
            // Potential bug. Needs better approach
            this.selectableItem.selectable = !(this._disabled || this._readonly);
            if (!this.selectableItem.selectable) {
                this.selectionService.deselectItem(this.selectableItem);
            }
        }
    }
}
