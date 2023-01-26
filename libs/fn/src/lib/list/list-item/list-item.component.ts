import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    Optional,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {
    FdkDisabledProvider,
    FdkReadonlyProvider,
    FocusableItemDirective,
    SelectableItemToken,
    SelectionService
} from '@fundamental-ngx/cdk/utils';
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
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { BooleanInput, coerceArray } from '@angular/cdk/coercion';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fn-list-item, [fn-list-item]',
    templateUrl: './list-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.fn-list__item]': 'true'
    },
    providers: [DestroyedService, FdkDisabledProvider, FdkReadonlyProvider],
    hostDirectives: [FocusableItemDirective]
})
export class ListItemComponent {
    @Input()
    @HostBinding('class.fn-list__item--info-bar')
    @coerceBoolean
    infoBar!: BooleanInput;

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

    checkboxContext$!: Observable<CheckboxContext>;

    readonly!: boolean;
    disabled!: boolean;

    constructor(
        private _cd: ChangeDetectorRef,
        private _destroy$: DestroyedService,
        @Optional() private _selectionService: SelectionService<HTMLElement>,
        @Optional() @Inject(SelectableItemToken) private _selectableItem: SelectableItemToken,
        @Optional() @Inject(ListComponent) private _listComponent: ListComponent | null,
        private _elementRef: ElementRef<HTMLElement>,
        private _disabledProvider: FdkDisabledProvider,
        private _readonlyProvider: FdkReadonlyProvider
    ) {
        if (this._selectionService && this._selectableItem) {
            this.checkboxContext$ = this._selectionService.value$.pipe(
                map((v) => coerceArray(v)),
                map((value: any[]) => value.includes(this._selectableItem.value)),
                distinctUntilChanged(),
                map((selected) => ({
                    $implicit: selected,
                    update: this.toggleItemSelection
                }))
            );
        }
    }

    get byline(): boolean {
        return !!this._listComponent?.byline;
    }

    $templateRef = (template: any): TemplateRef<any> => template;

    public elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    private toggleItemSelection = (isSelected: boolean): void => {
        if (isSelected) {
            this._selectionService?.selectItem(this._selectableItem);
        } else {
            this._selectionService?.deselectItem(this._selectableItem);
        }
    };
}
