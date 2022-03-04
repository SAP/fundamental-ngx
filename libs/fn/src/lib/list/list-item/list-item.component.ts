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
    DestroyedBehavior,
    FnDisabledProvider,
    FnFocusableItemProvider,
    FnReadonlyProvider,
    SelectableItemToken,
    SelectionService
} from '@fundamental-ngx/fn/cdk';
import {
    FN_LIST_ACTIONS,
    FN_LIST_BYLINE,
    FN_LIST_CHECKBOX,
    FN_LIST_ICON,
    FN_LIST_POSTFIX,
    FN_LIST_PREFIX,
    FN_LIST_TITLE
} from '../list.tokens';
import { coerceBoolean, TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';
import { CheckboxContext } from '../list-item-checkbox.directive';
import { ListComponent } from '../list/list.component';

@Component({
    selector: 'fn-list-item, [fn-list-item]',
    templateUrl: './list-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fn-list__item]': 'true'
    },
    providers: [DestroyedBehavior, FnDisabledProvider, FnReadonlyProvider, FnFocusableItemProvider]
})
export class ListItemComponent {
    @Input()
    @HostBinding('class.fn-list__item--info-bar')
    @coerceBoolean
    infoBar!: boolean;

    @ContentChild(FN_LIST_CHECKBOX)
    checkboxProvider?: TemplateRefProviderToken<CheckboxContext>;
    @ContentChild(FN_LIST_PREFIX)
    prefixProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_ICON)
    iconProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_TITLE)
    titleProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_BYLINE)
    bylineProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_ACTIONS)
    actionsProvider?: TemplateRefProviderToken<void>;
    @ContentChild(FN_LIST_POSTFIX)
    postfixProvider?: TemplateRefProviderToken<void>;

    readonly!: boolean;
    disabled!: boolean;

    constructor(
        private _destroy$: DestroyedBehavior,
        @Optional() private selectionService: SelectionService,
        @Optional() @Inject(SelectableItemToken) private selectableItem: SelectableItemToken,
        @Inject(ListComponent) private listComponent: ListComponent,
        private _elementRef: ElementRef<HTMLElement>,
        private disabledProvider: FnDisabledProvider,
        private readonlyProvider: FnReadonlyProvider,
        private focusableItemProvider: FnFocusableItemProvider
    ) {
        focusableItemProvider.setFocusable(true);
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
}
