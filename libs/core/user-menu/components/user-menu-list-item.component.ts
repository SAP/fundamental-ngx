import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
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
    inject,
    input,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyboardSupportItemInterface } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Observable, Subject, asyncScheduler, observeOn, startWith, take } from 'rxjs';

let uniqueId = 0;
let uniqueTextId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-user-menu-list-item]',
    templateUrl: './user-menu-list-item.component.html',
    host: {
        class: 'fd-menu__item',
        role: 'none',
        '[attr.id]': 'uniqueId()',
        '[attr.aria-labelledby]': 'textId()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PopoverBodyComponent, PopoverComponent, PopoverControlComponent, CommonModule]
})
export class UserMenuListItemComponent implements KeyboardSupportItemInterface {
    /** Event emitter for keyDown event */
    @Output()
    keyDown = new EventEmitter<KeyboardEvent>();

    /** Event emitter for isOpenChange event that controls the submenu popover body */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitter for showSubmenu event */
    @Output() showSubmenu: EventEmitter<TemplateRef<any> | null> = new EventEmitter();

    /** Event emitter for updateTitle event */
    @Output() updateTitle: EventEmitter<string | null> = new EventEmitter();

    /** Unique id for the menu list item. Default is provided. */
    uniqueId = input(`fd-menu-list-item-${++uniqueId}`);

    /** Icon name for the menu list item (optional) */
    icon = input<string>();

    /** Required text for the menu list item */
    text = input.required<string>();

    /** Unique id for the title. Default is provided. */
    textId = input(`fd-menu-list-item-title-${++uniqueTextId}`);

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

    /** @hidden */
    @HostListener('focusin')
    focusHandler(): void {
        this.focused.next(this);
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
        const firstTabbableElement: HTMLButtonElement =
            popover.popoverBody._elementRef.nativeElement.querySelector('.fd-menu__link');

        const linkElement: HTMLButtonElement = this._elementRef.nativeElement.querySelector('.fd-menu__link');

        if (this.isOpen() === isOpen) {
            return;
        }

        this.isOpen.set(isOpen);

        this.isOpenChange.emit(isOpen);

        this._onZoneStable().subscribe(() => {
            this.isOpen() ? linkElement.classList.add('is-active') : linkElement.classList.remove('is-active');
            firstTabbableElement.focus();
        });

        if (!this.isOpen()) {
            linkElement.focus();
        }

        this._changeDetectionRef.detectChanges();
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
