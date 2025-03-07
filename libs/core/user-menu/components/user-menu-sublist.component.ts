import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    HostListener,
    QueryList,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyboardSupportService } from '@fundamental-ngx/cdk/utils';
import { UserMenuListItemComponent } from '@fundamental-ngx/core/user-menu';
import { Subject, merge, startWith, takeUntil } from 'rxjs';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-sublist]',
    template: `<ul class="fd-menu__list fd-user-menu__menu-list" role="menu">
        <ng-content />
    </ul> `,
    host: {
        class: 'fd-menu fd-user-menu__menu',
        '[class.fd-menu--icons]': 'hasIcons()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            [fd-user-menu-sublist] {
                margin-block-start: 0 !important;
            }
        `
    ]
})
export class UserMenuSublistComponent implements AfterViewInit {
    /** @hidden */
    @ContentChildren(UserMenuListItemComponent, { descendants: true })
    _listItems: QueryList<UserMenuListItemComponent>;

    /** Whether the sublist menu items have icons */
    hasIcons = input(false, { transform: booleanAttribute });

    /** @hidden */
    private _refresh$ = new Subject<void>();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _keyboardSupportService = inject(KeyboardSupportService<UserMenuListItemComponent>);

    /** @hidden */
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
