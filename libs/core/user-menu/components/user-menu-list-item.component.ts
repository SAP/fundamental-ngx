import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostListener,
    NgZone,
    Output,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    inject,
    input,
    signal,
    viewChild
} from '@angular/core';

import { FocusableOption } from '@angular/cdk/a11y';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Observable, Subject, asyncScheduler, observeOn, startWith, take } from 'rxjs';
import { UserMenuBodyComponent } from './user-menu-body.component';

let uniqueId = 0;
let uniqueTextId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-list-item]',
    templateUrl: './user-menu-list-item.component.html',
    host: {
        class: 'fd-menu__item',
        role: 'menuitem',
        '[attr.aria-labelledby]': 'textId()',
        '[attr.tabindex]': '_normalizedTabIndex$()',
        '[attr.id]': 'uniqueId()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PopoverBodyComponent, PopoverComponent, PopoverControlComponent, CommonModule]
})
export class UserMenuListItemComponent implements FocusableOption, AfterViewInit {
    /** Emits when key is pressed */
    @Output() keyDown = new EventEmitter<KeyboardEvent>();

    /** Unique id for the menu list item */
    uniqueId = input(`fd-menu-list-item-${++uniqueId}`);

    /** Icon name for the menu list item (optional) */
    icon = input<string>();

    /** Required text for the menu list item */
    text = input.required<string>();

    /** Unique id for the title */
    textId = input(`fd-menu-list-item-title-${++uniqueTextId}`);

    /** Whether the item has a submenu */
    hasSubmenu = input(false, { transform: booleanAttribute });

    /** Template ref for user menu list item submenu */
    submenu = input<TemplateRef<any> | null>(null);

    /** Whether the item is selected */
    selected = input(false, { transform: booleanAttribute });

    /** Whether the item is in mobile mode */
    mobile = signal(false);

    /** Whether the popover is open */
    isOpen = signal(false);

    /** Link element reference */
    popover = viewChild('popover', { read: ElementRef });

    /** Link element reference */
    link = viewChild('linkEl', { read: ElementRef });

    /** Link element reference */
    linkPopover = viewChild('linkElPopover', { read: ElementRef });

    linkEl = computed(() => this.link()?.nativeElement);

    linkPopoverEl = computed(() => this.linkPopover()?.nativeElement);

    set tabindex(value: number) {
        this._tabIndex$.set(coerceNumberProperty(value, -1));
    }
    get tabindex(): number {
        return this._normalizedTabIndex$();
    }

    /** Normalized tab index computation */
    _normalizedTabIndex$ = computed(() => {
        if (this._isFirstItem$() && this._tabIndex$() === undefined) {
            return 0;
        }
        return this._tabIndex$() ?? -1;
    });

    /** Emits when the item is focused */
    readonly _focused$ = new Subject<{ focusedWithin: boolean }>();

    /** Emits when the item is clicked */
    readonly _clicked$ = new Subject<MouseEvent>();

    /** Whether popover is open. Applicable for snapped navigation state. */
    readonly popoverOpen$ = signal(false);

    private _userMenuBody = inject(UserMenuBodyComponent);

    private _elementRef = inject(ElementRef);

    /** Determines if this is the first item */
    private _isFirstItem$ = signal(false);

    /** Stores the tab index */
    private _tabIndex$ = signal<number | undefined>(undefined);

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** Handle focus events */
    @HostListener('focusin', ['$event'])
    onFocus(event: FocusEvent): void {
        this._focused$.next({ focusedWithin: event.target !== this._elementRef.nativeElement });

        const link = this.linkEl() || this.linkPopoverEl();

        if (link) {
            link.classList.add('is-focus');
            link.focus();
        }
    }

    @HostListener('focusout', ['$event'])
    onFocusOut(): void {
        const link = this.linkEl() || this.linkPopoverEl();

        if (link) {
            link.classList.remove('is-focus');
        }
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            const link = this.linkEl() || this.linkPopoverEl();

            if (link) {
                link.classList.add('is-active');
                this._muteEvent(event);
            }
        }

        this.keyDown.emit(event);
    }

    @HostListener('keyup', ['$event'])
    keyupHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            const link = this.linkEl();
            const linkPopover = this.linkPopoverEl();

            if (link) {
                link.classList.remove('is-active');
                link.click();
                this._muteEvent(event);
            }

            if (linkPopover) {
                event.stopPropagation();
                linkPopover.classList.remove('is-active');
            }
        }
    }

    /** Lifecycle hook: Perform actions after view initialization */
    ngAfterViewInit(): void {
        const link = this.link();
        if (link) {
            // console.log("Link element:", link.nativeElement);
        }
    }

    /** Simulate a click on the native element */
    click(): void {
        this._elementRef.nativeElement?.click();
    }

    /** Focus the native element */
    focus(): void {
        this._elementRef.nativeElement?.focus();
    }

    /** Mark this as the first item */
    setIsFirst(value: boolean): void {
        this._isFirstItem$.set(value);
    }

    /** Handle submenu selection in mobile mode */
    onShowDetailsView(): void {
        if (this.submenu() && this.mobile()) {
            this._userMenuBody.selectItem(this.submenu());
            this._userMenuBody.updateTitle(this.text());
        }
    }

    onPopoverOpen(isOpen: boolean, popover: PopoverComponent): void {
        this.popoverOpen$.set(isOpen);
        if (!isOpen) {
            return;
        }

        this._onZoneStable().subscribe(() => {
            // popover.popoverBody._focusFirstTabbableElement(true);

            const firstListItem = popover.popoverBody._elementRef.nativeElement.querySelector('li.fd-menu__item');

            if (firstListItem) {
                firstListItem.focus();
            }
        });

        console.log('Inside onPopoverOpen');
        console.log('isOpen', isOpen);
        console.log('popover', popover?.popoverBody._elementRef.nativeElement);
    }

    /** @hidden */
    _muteEvent(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
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
