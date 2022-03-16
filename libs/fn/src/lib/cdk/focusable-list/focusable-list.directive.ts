import { AfterViewInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { FocusableItem, FocusableListService } from './focusable-list.service';
import { FocusableItemDirective } from '../focusable-item/focusable-item.directive';
import { DestroyedBehavior } from '../common-behaviors/destroyed-behavior';

@Directive({
    selector: '[fnFocusableList]',
    exportAs: 'fnFocusableList',
    providers: [FocusableListService, DestroyedBehavior]
})
export class FocusableListDirective implements AfterViewInit {
    @Input()
    navigationDirection: 'horizontal' | 'vertical' = 'vertical';

    @Input()
    contentDirection: 'ltr' | 'rtl' | null = 'ltr';

    @ContentChildren(FocusableItemDirective) focusableItems!: QueryList<FocusableItemDirective>;

    constructor(private _focusableListService: FocusableListService, private _destroy$: DestroyedBehavior) {}

    ngAfterViewInit(): void {
        this.focusableItems.changes
            .pipe(
                startWith(this.focusableItems),
                map((queryList) => queryList.toArray()),
                tap((items: FocusableItemDirective[]): void => {
                    const focusableItems: FocusableItem[] = items.map((item, index) => ({
                        index,
                        focusable: () => item.fnFocusableItem,
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
