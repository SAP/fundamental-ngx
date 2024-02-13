import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    HostListener,
    Input,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';

import { KeyboardSupportService, Nullable } from '@fundamental-ngx/cdk/utils';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subject, merge, startWith, takeUntil } from 'rxjs';
import { ActionSheetItemComponent } from '../action-sheet-item/action-sheet-item.component';

let actionSheetBodyUniqueIdCounter = 0;

/**
 * A component used to enforce a certain layout for the action sheet.
 * ```html
 * <fd-action-sheet>
 *     <fd-action-sheet-control>Control Element</fd-action-sheet-control>
 *     <fd-action-sheet-body>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *          <fd-action-sheet-item>Action Sheet Body</fd-action-sheet-item>
 *     </fd-action-sheet-body>
 * </fd-action-sheet>
 * ```
 */
@Component({
    selector: 'fd-action-sheet-body',
    templateUrl: './action-sheet-body.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [KeyboardSupportService, contentDensityObserverProviders()],
    standalone: true
})
export class ActionSheetBodyComponent implements AfterViewInit {
    /** Id of the Action Sheet Body. */
    @Input()
    actionSheetBodyId = `fd-action-sheet-body-${actionSheetBodyUniqueIdCounter++}`;

    /** Display in mobile view. */
    @Input()
    mobile = false;

    /** Aria-label for Action Sheet Body. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria-Labelledby for element describing Action Sheet Body. */
    @Input()
    ariaLabelledby: Nullable<string>;

    /** @hidden */
    @ViewChild('actionSheetElement')
    actionSheetElementRef: ElementRef<HTMLUListElement>;

    /** @hidden */
    @ContentChildren(ActionSheetItemComponent)
    private readonly _items: QueryList<ActionSheetItemComponent>;

    /** @hidden */
    private _refresh$ = new Subject<void>();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        private readonly _keyboardSupportService: KeyboardSupportService<ActionSheetItemComponent>,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this._keyboardSupportService.keyManager) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyboardSupportService.setKeyboardService(this._items, false, false);

        this._items.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._setupInteractionListeners();
        });
    }

    /** @hidden */
    private _setupInteractionListeners(): void {
        this._refresh$.next();
        this._refresh$.complete();
        this._refresh$ = new Subject<void>();

        merge(...this._items.toArray().map((i) => i.focused))
            .pipe(takeUntil(this._refresh$), takeUntilDestroyed(this._destroyRef))
            .subscribe((focusedItem) => {
                this._items.forEach((item) => {
                    item._tabIndex$.set(-1);
                });
                focusedItem._tabIndex$.set(0);
                this._keyboardSupportService.keyManager.setActiveItem(focusedItem);
            });
    }
}
