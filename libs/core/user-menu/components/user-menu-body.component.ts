import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    computed,
    contentChild,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialFocusDirective, RtlService } from '@fundamental-ngx/cdk/utils';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Subject, startWith } from 'rxjs';
import { UserMenuUserNameDirective } from '../directives/user-menu-user-name.directive';
import { resetListFocus } from '../utils/focus-utils';
import { UserMenuListItemComponent } from './user-menu-list-item.component';

@Component({
    selector: 'fd-user-menu-body',
    templateUrl: './user-menu-body.component.html',
    host: {
        class: 'fd-user-menu__body',
        '(click)': 'onClick($event)',
        '(focusout)': 'onFocusOut($event)'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BarComponent,
        CommonModule,
        TitleComponent,
        BarLeftDirective,
        BarRightDirective,
        ButtonBarComponent,
        BarElementDirective,
        InitialFocusDirective,
        FdTranslatePipe
    ],
    providers: [contentDensityObserverProviders()]
})
export class UserMenuBodyComponent implements AfterViewInit {
    /** @hidden */
    @ContentChildren(UserMenuListItemComponent, { descendants: true })
    readonly _listItems: QueryList<UserMenuListItemComponent>;

    /**
     * Template ref of the submenu
     */
    submenu = signal<TemplateRef<any> | null>(null);

    /**
     * The text of the selected item
     * Needed in mobile mode to update the title in the header
     */
    selectedItemTitle = signal<string | null>(null);

    /**
     * Signal indicating whether the user name element is currently visible
     * within the user menu. This updates automatically as the element
     * enters or leaves the viewport.
     *
     * Used by the template to conditionally render the sticky header.
     */
    readonly isUserNameVisible = signal(true);

    /**
     * Signal storing the HTML content of the user name element.
     * When the original element scrolls out of view, this content
     * is displayed in the sticky header.
     */
    readonly userNameContent = signal('');

    /**
     * Template ref to the header of the user menu body.
     * Needed in mobile mode
     */
    readonly bodyHeader = viewChild<TemplateRef<any>>('bodyHeader');

    /**
     * Handle the navigation icon (arrow) of the Back button in RTL mode
     */
    protected readonly navigationArrow = computed(() =>
        this._rtlService?.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    /** @hidden */
    protected readonly userNameEl = contentChild(UserMenuUserNameDirective, { read: ElementRef });

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _refresh$ = new Subject<void>();

    /** @hidden Track the list item that opened the details view for focus restoration */
    private _triggerItem: UserMenuListItemComponent | null = null;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    onClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    /**
     * Reset roving tabindex when focus leaves the menu entirely,
     * so Tab re-entry starts at the first item instead of the last-focused item.
     *
     * First checks relatedTarget synchronously for quick exits, then uses
     * setTimeout(0) to defer the check until after the current event loop tick,
     * handling cases where focus transitions through multiple items before leaving
     * (relatedTarget can be temporarily null during rapid moves, but activeElement
     * will be correctly set after the current event completes).
     * @hidden
     */
    onFocusOut(event: FocusEvent): void {
        const relatedTarget = event.relatedTarget as HTMLElement;
        const currentTarget = event.currentTarget as HTMLElement;

        // Synchronous check: if relatedTarget is known and inside menu, don't reset
        if (relatedTarget && currentTarget.contains(relatedTarget)) {
            return;
        }

        // Deferred check: ensure focus has fully settled before resetting
        // This handles rapid transitions where relatedTarget might be null temporarily
        setTimeout(() => {
            const activeElement = document.activeElement as HTMLElement;
            if (!activeElement || !currentTarget.contains(activeElement)) {
                this._resetListFocus();
            }
        }, 0);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listItems.changes
            .pipe(startWith(this._listItems), takeUntilDestroyed(this._destroyRef))
            .subscribe((listItems) => {
                listItems.forEach((item: UserMenuListItemComponent) => {
                    item.showSubmenu
                        .pipe(takeUntilDestroyed(this._destroyRef))
                        .subscribe((submenuTpl: TemplateRef<any> | null) => {
                            this._triggerItem = item;
                            this.selectItem(submenuTpl);
                        });
                    item.updateTitle.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((title: string | null) => {
                        this.updateTitle(title);
                    });
                });
            });

        const el = this.userNameEl()?.nativeElement;

        if (!el) {
            return;
        }

        // logic for showing/hiding the popover header with user name on scroll
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                this.isUserNameVisible.set(entries[0].isIntersecting);
            },
            { root: null, threshold: 0 }
        );

        intersectionObserver.observe(el);

        // Initialize
        this.userNameContent.set(el.innerHTML.trim());

        // Watch for changes in projected content
        const mutationObserver = new MutationObserver(() => {
            this.userNameContent.set(el.innerHTML.trim());
        });

        mutationObserver.observe(el, {
            childList: true,
            characterData: true,
            subtree: true
        });

        this._destroyRef.onDestroy(() => {
            intersectionObserver.disconnect();
            mutationObserver.disconnect();
        });
    }

    /**
     * Selects the item and sets the submenu template ref
     */
    selectItem(submenuTpl: TemplateRef<any> | null): void {
        this.submenu.set(submenuTpl);
    }

    /**
     * Updates the title of the selected item
     */
    updateTitle(title: string | null): void {
        this.selectedItemTitle.set(title);
    }

    /**
     * Clears the submenu template ref and the selected item title
     * Closes the submenu and returns to the main view
     */
    clearSubmenu(): void {
        const itemToFocus = this._triggerItem;
        this.submenu.set(null);
        this.selectedItemTitle.set(null);
        this._triggerItem = null;

        if (itemToFocus) {
            // Delay focus to allow the main view to render first
            requestAnimationFrame(() => {
                itemToFocus.focus();
            });
        }
    }

    /**
     * Closes the dialog in mobile mode
     */
    closeDialog(dialogRef): void {
        dialogRef.dismiss('Close');
        this.clearSubmenu();
    }

    /** @hidden */
    private _resetListFocus(): void {
        if (!this._listItems || this._listItems.length === 0) {
            return;
        }

        resetListFocus(this._listItems.toArray());
    }
}
