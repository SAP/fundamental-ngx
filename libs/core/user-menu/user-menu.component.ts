import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    contentChild,
    contentChildren,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    Injector,
    input,
    isDevMode,
    output,
    Renderer2,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { asyncScheduler, filter, observeOn, switchMap } from 'rxjs';

import { KeyboardSupportService, RtlService, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef,
    DialogService
} from '@fundamental-ngx/core/dialog';

import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

import { BarComponent, BarElementDirective, BarMiddleDirective } from '@fundamental-ngx/core/bar';

import { UserMenuBodyComponent } from './components/user-menu-body.component';
import { UserMenuControlComponent } from './components/user-menu-control.component';
import { UserMenuListItemComponent } from './components/user-menu-list-item.component';
import { UserMenuControlElementDirective } from './directives/user-menu-control-element.directive';
import { UserMenuUserNameDirective } from './directives/user-menu-user-name.directive';
import { resetListFocus } from './utils/focus-utils';

@Component({
    selector: 'fd-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-user-menu'
    },
    imports: [
        CommonModule,
        BarComponent,
        BarMiddleDirective,
        BarElementDirective,
        PopoverComponent,
        PopoverBodyComponent,
        PopoverControlComponent,
        DialogComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        DialogHeaderComponent,
        TemplateDirective
    ],
    providers: [KeyboardSupportService, contentDensityObserverProviders()]
})
export class UserMenuComponent implements AfterViewInit {
    /** Event thrown, when the user menu is opened or closed */
    isOpenChange = output<boolean>();

    /** Whether the user menu is in mobile mode */
    mobile = input(false, { transform: booleanAttribute });

    /** Whether the user menu is open */
    readonly isOpen = signal(false);

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

    /** @hidden */
    protected readonly userMenuControl = contentChild(UserMenuControlComponent);

    /** @hidden */
    protected readonly userNameEl = contentChild(UserMenuUserNameDirective, { read: ElementRef });

    /** @hidden */
    protected readonly userMenuControlElement = contentChild(UserMenuControlElementDirective, {
        descendants: true,
        read: ElementRef
    });

    /** @hidden */
    protected readonly userMenuBody = contentChild(UserMenuBodyComponent, { descendants: true });

    /** @hidden */
    protected readonly dialogTemplate = viewChild<TemplateRef<any>>('dialogTemplate');

    /** @hidden */
    protected readonly navigationArrow = computed(() =>
        this._rtlService.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    /** @hidden */
    private readonly _listItems = contentChildren(UserMenuListItemComponent, { descendants: true });

    /** @hidden */
    private readonly _rtlService = inject(RtlService);

    /** @hidden */
    private readonly _dialogService = inject(DialogService);

    /** @hidden */
    private readonly _changeDetectionRef = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private _dialogRef: DialogRef | undefined;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    constructor() {
        effect(() => {
            const isMobile = this.mobile();
            this._listItems()?.forEach((item) => item.mobile.set(isMobile));
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        const isMobile = this.mobile();
        this._listItems()?.forEach((item) => item.mobile.set(isMobile));

        // Subscribe to user menu control clicks for mobile mode
        // Use toObservable + switchMap to auto-unsubscribe when control changes
        toObservable(this.userMenuControl, { injector: this._injector })
            .pipe(
                filter((control) => !!control),
                switchMap((control) => control!.clicked),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                if (this.mobile()) {
                    const template = this.dialogTemplate();
                    if (template) {
                        this.openDialog(template);
                    }
                }
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
            { root: null, threshold: 0, rootMargin: '-20px 0px 0px 0px' }
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

    /** Method that opens the user menu */
    open(): void {
        this.isOpenChangeHandle(true);
    }

    /** Method that closes the user menu */
    close(): void {
        this.isOpenChangeHandle(false);

        if (this._listItems().length > 0) {
            this._listItems().forEach((item) => {
                item.isOpen.set(false);
                item._elementRef?.nativeElement.querySelector('.fd-menu__link')?.classList.remove('is-active');
            });

            this._resetListFocus();
        }

        this._clearSubmenu();
        this._dialogRef?.close();
    }

    /** Method that opens the user menu in dialog (for mobile mode) */
    openDialog(dialogTemplate: TemplateRef<any>): void {
        this._dialogRef = this._dialogService.open(dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            horizontalPadding: false,
            ariaLabelledBy: 'fd-user-menu-header',
            ariaDescribedBy: 'fd-user-menu-body',
            contentDensity: ContentDensityMode.COZY
        });

        // Focus first list item when dialog loads
        // Use observeOn(asyncScheduler) to ensure dialog has fully rendered
        toObservable(this._dialogRef.isLoaded, { injector: this._injector })
            .pipe(
                filter((loaded) => loaded),
                observeOn(asyncScheduler),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                try {
                    const firstListItem = this._listItems()[0];
                    if (firstListItem) {
                        firstListItem.focus();
                    }
                } catch (error) {
                    if (isDevMode()) {
                        console.error('Failed to focus first user menu item', error);
                    }
                }
            });

        const refSub = this._dialogRef.afterClosed.subscribe({
            next: () => {
                this.userMenuControl()?.focus();
                refSub.unsubscribe();
            },
            error: (type) => {
                if (type === 'escape') {
                    this._clearSubmenu();
                    refSub.unsubscribe();
                }
            }
        });
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        if (this.isOpen() === isOpen) {
            return;
        }

        this.isOpen.set(isOpen);
        this.isOpenChange.emit(isOpen);

        if (!isOpen && !this.mobile()) {
            this.userMenuControl()?.focus();
        }

        const userMenuControlEl = this.userMenuControlElement()?.nativeElement;

        this.userMenuControlElement()?.nativeElement &&
            (isOpen
                ? this._renderer.addClass(userMenuControlEl, 'is-active')
                : this._renderer.removeClass(userMenuControlEl, 'is-active'));

        this._changeDetectionRef.detectChanges();

        // Focus first list item when popover opens
        // Use requestAnimationFrame to allow popover rendering to complete
        if (isOpen && !this.mobile()) {
            requestAnimationFrame(() => {
                const firstListItem = this._listItems()[0];
                if (firstListItem) {
                    firstListItem.focus();
                }
            });
        }
    }

    /** @hidden */
    private _clearSubmenu(): void {
        const userMenuBody = this.userMenuBody();
        if (userMenuBody) {
            userMenuBody.clearSubmenu();
        }
    }

    /**
     * Resets roving tabindex to the first list item.
     *
     * Roving tabindex preserves focus within the list (important for submenus),
     * but when tabbing back into the menu from outside, focus should start at
     * the first item, not the last-focused item. Called when focus leaves the menu.
     *
     * @hidden
     */
    private _resetListFocus(): void {
        resetListFocus(this._listItems());
    }
}
