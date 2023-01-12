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
    providers: [FocusableListService, DestroyedService]
})
export class FocusableListDirective implements AfterViewInit {
    /** Direction of navigation. */
    @Input()
    navigationDirection: 'horizontal' | 'vertical' = 'vertical';

    /** Direction of the content. */
    @Input()
    contentDirection: 'ltr' | 'rtl' | null = 'ltr';

    /** @hidden */
    @ContentChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE) private _focusableItems: QueryList<FocusableItemDirective>;

    /** @hidden */
    constructor(private _focusableListService: FocusableListService, private _destroy$: DestroyedService) {}

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
                    this._focusableListService.initialize(focusableItems, {
                        direction: this.navigationDirection,
                        contentDirection: this.contentDirection
                    });
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }
}
