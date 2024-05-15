import {
    AfterContentInit,
    ContentChildren,
    DestroyRef,
    Directive,
    EventEmitter,
    HostListener,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    contentChildren,
    inject,
    input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FocusEscapeDirection, KeyboardSupportService, Nullable, destroyObservable } from '@fundamental-ngx/cdk/utils';
import { Observable, Subject, map, merge, startWith, takeUntil } from 'rxjs';
import { CardFocusItem } from '../card-focus-item.model';
import { CardComponent } from '../card.component';
import { FD_CARD } from '../token';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-list]',
    standalone: true,
    host: {
        role: 'list',
        '[attr.aria-roledescription]': 'ariaRoleDescription()',
        '[attr.aria-label]': 'ariaLabel()'
    },
    providers: [KeyboardSupportService]
})
export class CardListDirective implements OnInit, AfterContentInit, OnDestroy {
    /**
     * an event thrown, when focus escapes the list
     */
    @Output()
    focusEscapeList = new EventEmitter<FocusEscapeDirection>();

    /** @hidden */
    @ContentChildren(CardFocusItem)
    private _focusItems: QueryList<CardFocusItem>;

    /**
     * whether internal keyboard support should be enabled.
     * default: true
     */
    keyboardSupport = input(true);

    /**
     * aria-roledescription for the Card list
     * default: 'Card Container'
     */
    ariaRoleDescription = input('Card Container');

    /**
     * aria-label for the Card list
     */
    ariaLabel = input<Nullable<string>>();

    /** @hidden */
    private _cards = contentChildren<CardComponent>(FD_CARD);

    /**
     * an RxJS Subject that will kill the data stream upon component’s destruction
     * for unsubscribing
     */
    private readonly _destroyRef = inject(DestroyRef);

    /**
     * an RxJS Subject that will kill the data stream upon queryList changes
     * for unsubscribing
     */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(private _keyboardSupportService: KeyboardSupportService<CardFocusItem>) {}

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.keyboardSupport()) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number, updateOnly = false): void {
        if (updateOnly) {
            this._keyboardSupportService.keyManager.updateActiveItem(index);
        } else {
            this._keyboardSupportService.keyManager.setActiveItem(index);
        }
    }

    /**
     * @returns Currently active list item.
     */
    getActiveItem(): CardFocusItem | null {
        return this._keyboardSupportService.keyManager.activeItem;
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenOnListFocusEscape();

        this._cards().forEach((card, index) => {
            card.ariaPosinset.set(++index);
            card.ariaSetsize.set(this._cards().length);
        });
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._keyboardSupportService.setKeyboardService(this._focusItems, false, false);
        this._listenOnQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onRefresh$.next();
        this._onRefresh$.complete();
    }

    /** @hidden */
    private _listenOnQueryChange(): void {
        this._focusItems.changes.pipe(startWith(0), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._listenOnItemsClick();
        });
    }

    /** @hidden */
    private _listenOnItemsClick(): void {
        this._onRefresh$.next();

        if (!this.keyboardSupport) {
            return;
        }

        const completion$ = merge(this._onRefresh$, destroyObservable(this._destroyRef));

        const interactionChangesIndexes: Observable<{ index: number; updateOnly: boolean }>[] = this._focusItems.map(
            (item, index) =>
                merge(
                    item._clicked$.pipe(map(() => ({ index, updateOnly: false }))),
                    item._focused$.pipe(map(({ focusedWithin }) => ({ index, updateOnly: focusedWithin })))
                )
        );

        merge(...interactionChangesIndexes)
            .pipe(takeUntil(completion$))
            .subscribe(({ index, updateOnly }) => this.setItemActive(index, updateOnly));
    }

    /** @hidden */
    private _listenOnListFocusEscape(): void {
        this._keyboardSupportService.focusEscapeList
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((direction) => this.focusEscapeList.emit(direction));
    }
}
