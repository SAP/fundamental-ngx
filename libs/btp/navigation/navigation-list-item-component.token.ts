import { FocusableOption } from '@angular/cdk/a11y';
import { DomPortal } from '@angular/cdk/portal';
import {
    DestroyRef,
    Directive,
    ElementRef,
    OnDestroy,
    Signal,
    WritableSignal,
    effect,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { BasePopoverClass, PopoverService } from '@fundamental-ngx/core/popover';
import { filter, of } from 'rxjs';
import { FdbNavigationComponent } from './navigation-component.token';
import { NavigationLinkComponent } from './navigation-link.component';
import { FdbNavigationListComponent } from './navigation-list-component.token';

@Directive()
export abstract class FdbNavigationListItemComponent extends BasePopoverClass implements FocusableOption, OnDestroy {
    abstract elementRef: ElementRef<HTMLElement>;
    abstract expanded: WritableSignal<boolean>;
    abstract expandedAttr: Signal<boolean>;
    abstract fullPathExpanded: Signal<boolean>;
    abstract _isInPopover: Signal<boolean>;
    abstract inPortal: Signal<boolean>;
    abstract childNavigationListComponent: Signal<FdbNavigationListComponent | null>;
    abstract isGroup: Signal<boolean>;
    abstract level: Signal<number>;
    abstract normalizedLevel: Signal<number>;
    abstract routerLinkActive: WritableSignal<RouterLinkActive | null>;
    abstract routerLink: WritableSignal<RouterLink | null>;
    abstract parentListItemComponent: FdbNavigationListItemComponent | null;
    abstract alwaysFocusable: boolean;
    abstract linkComponent: Nullable<NavigationLinkComponent>;
    abstract domPortal: Nullable<DomPortal>;
    abstract focusOnClonedLink(): void;
    abstract expand(): void;
    abstract collapse(): void;
    abstract toggle(): void;
    abstract setSnappedActiveState(isActive: boolean): void;
    abstract focus(): void;
    abstract hide(): void;
    abstract show(): void;
    abstract calculateExpanded(): void;
    abstract checkSelfHidden(): void;
    abstract createPortal(): DomPortal;
    abstract destroyPortal(): void;

    /** @hidden */
    _hidden = signal(false);

    /** @hidden */
    hiddenItems = signal<FdbNavigationListItemComponent[]>([]);

    /** @hidden */
    navigationComponent = inject(FdbNavigationComponent);

    /** @hidden */
    hasPortalChildren = signal(false);

    /** @hidden */
    childFocused = signal(false);

    /** @hidden */
    parentNavigationListComponent = inject(FdbNavigationListComponent);

    /** @hidden */
    protected readonly _rtl = inject(RtlService, { optional: true });

    /** @hidden */
    protected readonly _isRtl = toSignal(this._rtl?.rtl || of(false), { requireSync: true });

    /** @hidden */
    protected readonly _popoverService = inject(PopoverService);

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _listenToSnappedExpandedState = true;

    /** @hidden */
    constructor() {
        super();
        this._rtl?.rtl.pipe(takeUntilDestroyed()).subscribe((isRtl) => {
            this.placement = isRtl ? 'left-start' : 'right-start';
            this._popoverService.refreshConfiguration(this);
        });

        effect(() => {
            this.isOpen = this.expanded();
        });

        effect(() => {
            const hasChildren = this.childNavigationListComponent() || this.hasPortalChildren();
            const isSnapped = this.navigationComponent.isSnapped();
            const shouldDisable = !isSnapped || !hasChildren || this._hidden();
            this._listenToSnappedExpandedState = true;
            this._popoverService.setIgnoreTriggers(shouldDisable);
            this._popoverService.disabled = shouldDisable;
        });

        effect(
            () => {
                if (!this._listenToSnappedExpandedState && !this._hidden()) {
                    return;
                }
                if (this.navigationComponent.isSnapped() && this.expanded() && this.normalizedLevel() > 1) {
                    this.expanded.set(false);
                    this.isOpen = false;
                    this._popoverService.refreshConfiguration(this);
                    this._listenToSnappedExpandedState = false;
                }
            },
            {
                allowSignalWrites: true
            }
        );

        effect(() => {
            const activeRouterLink = this.routerLinkActive();
            activeRouterLink?.isActiveChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((isActive) => {
                this.parentListItemComponent?.setSnappedActiveState(isActive);
            });
        });

        this.isOpenChange
            .pipe(
                filter(() => this.navigationComponent.isSnapped()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((isOpen) => {
                this.isOpen = isOpen;
                this.expanded.set(isOpen);
                if (!this.isOpen) {
                    // this.focus();
                }
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._popoverService.close();
        this._popoverService.onDestroy();
    }
}
