import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    input,
    NgZone,
    Output,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyboardSupportItemInterface, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { asyncScheduler, Observable, observeOn, startWith, Subject, take } from 'rxjs';

let uniqueId = 0;
let uniqueTextId = 0;
let uniqueSubtitleId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-list-item]',
    templateUrl: './user-menu-list-item.component.html',
    host: {
        class: 'fd-menu__item',
        role: 'none',
        '[attr.id]': 'uniqueId()',
        '[attr.aria-labelledby]': 'textId()',
        '(mouseenter)': 'onHostMouseEnter()',
        '(mouseleave)': 'onHostMouseLeave()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PopoverBodyComponent, PopoverComponent, PopoverControlComponent, CommonModule]
})
export class UserMenuListItemComponent implements KeyboardSupportItemInterface {
    /** Event emitter for isOpenChange event that controls the submenu popover body */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitter for showSubmenu event */
    @Output() showSubmenu: EventEmitter<TemplateRef<any> | null> = new EventEmitter();

    /** Event emitter for updateTitle event */
    @Output() updateTitle: EventEmitter<string | null> = new EventEmitter();

    /** Event emitter for keyDown event */
    readonly keyDown = output<KeyboardEvent>();

    /** Unique id for the menu list item. Default is provided. */
    uniqueId = input(`fd-menu-list-item-${++uniqueId}`);

    /** Icon name for the menu list item (optional) */
    icon = input<string>();

    /** Icon name for the menu list item (optional) */
    iconAfter = input<string>();

    /** Whether the icon after is in active state */
    iconAfterActive = input(false, { transform: booleanAttribute });

    /** Required text for the menu list item */
    text = input.required<string>();

    /** Unique id for the title. Default is provided. */
    textId = input(`fd-menu-list-item-title-${++uniqueTextId}`);

    /** Whether the text should be truncated */
    truncateText = input(false, { transform: booleanAttribute });

    /** Subtitle text for the menu list item */
    subtitle = input<string | undefined>();

    /** Unique id for the subtitle. Default is provided. */
    subtitleId = input(`fd-menu-list-item-subtitle-${++uniqueSubtitleId}`);

    /** Whether the subtitle should be truncated */
    truncateSubtitle = input(false, { transform: booleanAttribute });

    /** Whether the item has a submenu */
    hasSubmenu = input(false, { transform: booleanAttribute });

    /** Template ref for user menu list item submenu */
    submenu = input<TemplateRef<any> | null>(null);

    /** Whether the item is selected */
    selected = input(false, { transform: booleanAttribute });

    /** Whether the item's submenu is open */
    isOpen = signal(false);

    /** Whether the item is in mobile mode */
    mobile = signal(false);

    /** Reference to the popover */
    popover = viewChild(PopoverComponent);

    /** @hidden */
    readonly focused = new Subject<UserMenuListItemComponent>();

    /** Item's tabindex */
    readonly _tabIndex$ = signal<number | null>(null);

    /** @hidden */
    readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    private _changeDetectionRef = inject(ChangeDetectorRef);

    /** @hidden RTL service for direction detection */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden Computed signal to track RTL state */
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden Track whether popover open/close was triggered by keyboard */
    private _keyboardTriggered = false;

    /** @hidden Timer for delayed close on mouseleave */
    private _hoverCloseTimer: ReturnType<typeof setTimeout> | null = null;

    /** @hidden Grace period in ms before closing submenu on mouseleave */
    private readonly _hoverCloseDelay = 150;

    /** @hidden */
    @HostListener('focusin')
    focusHandler(): void {
        this.focused.next(this);
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (!this.hasSubmenu() || this.mobile()) {
            return;
        }

        const popoverInstance = this.popover();
        if (!popoverInstance) {
            return;
        }

        const isRtl = this._isRtl();

        // In RTL mode, LEFT arrow opens submenu and RIGHT arrow closes it
        // In LTR mode, RIGHT arrow opens submenu and LEFT arrow closes it
        const openKey = isRtl ? LEFT_ARROW : RIGHT_ARROW;
        const closeKey = isRtl ? RIGHT_ARROW : LEFT_ARROW;

        if (KeyUtil.isKeyCode(event, openKey) && !this.isOpen()) {
            event.preventDefault();
            this._keyboardTriggered = true;
            popoverInstance.open();
        } else if (KeyUtil.isKeyCode(event, closeKey) && this.isOpen()) {
            event.preventDefault();
            this._keyboardTriggered = true;
            popoverInstance.close();
        }
    }

    /** @hidden Handle keyboard in popover body */
    onPopoverBodyKeyDown(event: KeyboardEvent): void {
        const isRtl = this._isRtl();
        const closeKey = isRtl ? RIGHT_ARROW : LEFT_ARROW;

        if (KeyUtil.isKeyCode(event, closeKey) && this.isOpen()) {
            event.preventDefault();
            this._keyboardTriggered = true;
            const popoverInstance = this.popover();
            if (popoverInstance) {
                popoverInstance.close();
            }
        }

        // Escape is handled by the popover internally, but we need to set the flag
        // so that focus returns to the trigger item
        if (KeyUtil.isKeyCode(event, ESCAPE) && this.isOpen()) {
            this._keyboardTriggered = true;
        }
    }

    /** @hidden Open submenu on host mouseenter (non-mobile only) */
    onHostMouseEnter(): void {
        if (!this.hasSubmenu() || this.mobile()) {
            return;
        }
        this._cancelHoverCloseTimer();
        const popoverInstance = this.popover();
        if (popoverInstance && !this.isOpen()) {
            popoverInstance.open();
        }
    }

    /** @hidden Schedule submenu close on host mouseleave */
    onHostMouseLeave(): void {
        if (!this.hasSubmenu() || this.mobile()) {
            return;
        }
        this._scheduleHoverClose();
    }

    /** @hidden Cancel close when mouse enters the submenu popover body */
    onSubmenuMouseEnter(): void {
        this._cancelHoverCloseTimer();
    }

    /** @hidden Schedule close when mouse leaves the submenu popover body */
    onSubmenuMouseLeave(): void {
        this._scheduleHoverClose();
    }

    /** Handles submenu selection in mobile mode */
    onShowDetailsView(): void {
        if (this.submenu() && this.mobile()) {
            this.showSubmenu.emit(this.submenu());
            this.updateTitle.emit(this.text());
        }
    }

    /** @hidden Support for KeyboardSupportItemInterface */
    click(): void {
        const linkElement: HTMLButtonElement = this._elementRef.nativeElement.querySelector('.fd-menu__link');
        linkElement.click();
    }

    /** @hidden */
    focus(): void {
        const linkElement: HTMLButtonElement = this._elementRef.nativeElement.querySelector('.fd-menu__link');
        linkElement.focus();
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean, popover: PopoverComponent): void {
        const popoverBodyEl = (popover as any).popoverBody?.();
        const firstTabbableElement: HTMLButtonElement =
            popoverBodyEl?._elementRef.nativeElement.querySelector('.fd-menu__link');

        const linkElement: HTMLButtonElement = this._elementRef.nativeElement.querySelector('.fd-menu__link');

        if (this.isOpen() === isOpen) {
            return;
        }

        const keyboardTriggered = this._keyboardTriggered;
        this._keyboardTriggered = false;

        this.isOpen.set(isOpen);

        this.isOpenChange.emit(isOpen);

        this._onZoneStable().subscribe(() => {
            this.isOpen() ? linkElement.classList.add('is-selected') : linkElement.classList.remove('is-selected');
            if (keyboardTriggered && firstTabbableElement && this.isOpen()) {
                firstTabbableElement.focus();
            }
        });

        if (!this.isOpen() && keyboardTriggered) {
            linkElement.focus();
        }

        this._changeDetectionRef.detectChanges();
    }

    /** @hidden Schedule a delayed close of the submenu popover */
    private _scheduleHoverClose(): void {
        this._cancelHoverCloseTimer();
        this._hoverCloseTimer = setTimeout(() => {
            const popoverInstance = this.popover();
            if (popoverInstance && this.isOpen()) {
                popoverInstance.close();
            }
        }, this._hoverCloseDelay);
    }

    /** @hidden Cancel any pending hover close timer */
    private _cancelHoverCloseTimer(): void {
        if (this._hoverCloseTimer !== null) {
            clearTimeout(this._hoverCloseTimer);
            this._hoverCloseTimer = null;
        }
    }

    /** @hidden */
    private _onZoneStable(): Observable<void> {
        return this._zone.onStable.pipe(
            startWith(this._zone.isStable),
            observeOn(asyncScheduler),
            take(1),
            takeUntilDestroyed(this._destroyRef)
        );
    }
}
