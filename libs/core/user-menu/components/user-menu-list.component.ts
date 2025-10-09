import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    HostListener,
    inject,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyboardSupportService } from '@fundamental-ngx/cdk/utils';
import { merge, startWith, Subject, takeUntil } from 'rxjs';
import { UserMenuListItemComponent } from './user-menu-list-item.component';

@Component({
    selector: 'fd-user-menu-list',
    template: `
        <nav class="fd-menu fd-menu--icons fd-user-menu__menu">
            <ul class="fd-menu__list fd-user-menu__menu-list" role="menu">
                <ng-content />
            </ul>
        </nav>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuListComponent implements AfterViewInit {
    /** @hidden */
    @ContentChildren(UserMenuListItemComponent, { descendants: true })
    readonly _listItems: QueryList<UserMenuListItemComponent>;

    /** @hidden */
    private _refresh$ = new Subject<void>();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _keyboardSupportService = inject(KeyboardSupportService);

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this._keyboardSupportService.keyManager) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyboardSupportService.setKeyboardService(this._listItems, false, false);

        this._listItems.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._setupInteractionListeners();
        });
    }

    /** @hidden */
    private _setupInteractionListeners(): void {
        this._refresh$.next();
        this._refresh$.complete();
        this._refresh$ = new Subject<void>();

        merge(...this._listItems.toArray().map((i) => i.focused))
            .pipe(takeUntil(this._refresh$), takeUntilDestroyed(this._destroyRef))
            .subscribe((focusedItem) => {
                this._listItems.forEach((item) => {
                    item._tabIndex$.set(-1);
                });
                focusedItem._tabIndex$.set(0);
                this._keyboardSupportService.keyManager.setActiveItem(focusedItem);
            });
    }
}
