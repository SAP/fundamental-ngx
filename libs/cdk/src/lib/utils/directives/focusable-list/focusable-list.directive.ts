import { AfterViewInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FocusableItem, FocusableListService } from './focusable-list.service';
import { FocusableItemDirective } from '../focusable-item/focusable-item.directive';
import { DestroyedService } from '../../services/destroyed.service';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE } from '../focusable-item';
import { FDK_FOCUSABLE_LIST_DIRECTIVE } from './focusable-list.tokens';
import { ReplaySubject } from 'rxjs';
import { Nullable } from '../../models/nullable';

export interface FocusableListEvent {
    list: FocusableListDirective;
    event: KeyboardEvent;
    activeItemIndex: Nullable<number>;
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fnFocusableList]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkFocusableList]', '[fnFocusableList]')
        }
    ]
})
export class DeprecatedFocusableListDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkFocusableList]',
    exportAs: 'fdkFocusableList',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: FocusableListDirective
        },
        FocusableListService,
        DestroyedService
    ]
})
export class FocusableListDirective extends ReplaySubject<FocusableListEvent> implements AfterViewInit {
    /** Direction of navigation. Always horizontal when in grid. */
    @Input()
    navigationDirection: 'horizontal' | 'vertical' = 'vertical';

    /** Direction of the content. */
    @Input()
    contentDirection: 'ltr' | 'rtl' | null = 'ltr';

    /**
     * Configures wrapping mode which determines whether the active item will wrap to the other end of list when there are no more items in the given direction.
     */
    @Input()
    wrap = false;

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE) public readonly _focusableItems: QueryList<FocusableItemDirective>;

    /** @hidden */
    constructor(public readonly _focusableListService: FocusableListService, private _destroy$: DestroyedService) {
        super(1);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._focusableItems.changes
            .pipe(
                startWith(this._focusableItems),
                map((queryList) => queryList.toArray()),
                tap((items: FocusableItemDirective[]): void => {
                    const focusableItems: FocusableItem[] = items.map((item, index) => ({
                        index,
                        focusable: () => item.fdkFocusableItem,
                        elementRef: () => item.elementRef(),
                        focus: () => item.elementRef().nativeElement.focus()
                    }));

                    this._focusableListService.initialize(focusableItems, this, {
                        direction: this.navigationDirection,
                        contentDirection: this.contentDirection,
                        wrap: this.wrap
                    });
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
