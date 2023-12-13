import { DomPortal } from '@angular/cdk/portal';
import { AfterViewInit, Directive, ElementRef, HostListener, inject, Input, NgZone, Renderer2 } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, delayWhen, Observable, Subject, tap } from 'rxjs';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { FD_MENU_ITEM_COMPONENT } from '../../menu.tokens';

@Directive({
    selector: 'li[fd-menu-item][fdMenuSegmentedButtonOption]',
    standalone: true
})
export class SegmentedButtonOptionDirective<T> implements AfterViewInit {
    /** @ignore */
    @Input() value: T;

    /** @ignore */
    readonly elementRef = inject(ElementRef);

    /** @ignore */
    readonly menuItem = inject<MenuItemComponent>(FD_MENU_ITEM_COMPONENT, { host: true });

    /** @ignore */
    readonly clicked: Observable<void>;

    /** @ignore */
    readonly renderer2 = inject(Renderer2);

    /** @ignore */
    private _clicked = new Subject<void>();

    /** @ignore */
    private _dotElement: HTMLSpanElement;

    /** @ignore */
    private _viewInit$ = new Subject<void>();

    /** @ignore */
    private _selected$ = new BehaviorSubject<boolean>(false);

    /** @ignore */
    constructor() {
        this.clicked = this._clicked.asObservable();
        const ngZone = inject(NgZone);
        combineLatest([this._viewInit$.pipe(delayWhen(() => ngZone.onStable.asObservable())), this._selected$])
            .pipe(
                tap(() => {
                    if (!this._dotElement) {
                        this._createDot();
                    }
                }),
                tap(([, selected]) => {
                    selected ? this._showDot() : this._hideDot();
                }),
                takeUntilDestroyed()
            )
            .subscribe();
    }

    /** @ignore */
    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    _onClick($event: MouseEvent | KeyboardEvent): void {
        $event.preventDefault();
        this._clicked.next();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._viewInit$.next();
    }

    /** @ignore */
    private _createDot(): void {
        this._dotElement = this.renderer2.createElement('span');
        this.renderer2.appendChild(this.elementRef.nativeElement, this._dotElement);
        this.renderer2.addClass(this._dotElement, 'fd-menu__active-dot');
        this.renderer2.setAttribute(this._dotElement, 'role', 'presentation');
        this._hideDot();
        const addonDirective = this.menuItem.menuInteractive.startAddon;
        const addonGlyph = addonDirective._addonGlyph;
        addonGlyph.renderElement(new DomPortal(this._dotElement)).subscribe();
    }

    /** @ignore */
    private _showDot(): void {
        this.renderer2.setAttribute(this._dotElement, 'aria-hidden', 'false');
        this.renderer2.setStyle(this._dotElement, 'display', 'inline-block');
    }

    /** @ignore */
    private _hideDot(): void {
        this.renderer2.setAttribute(this._dotElement, 'aria-hidden', 'true');
        this.renderer2.setStyle(this._dotElement, 'display', 'none');
    }

    /** @ignore */
    set selected(isSelected: boolean) {
        this._selected$.next(isSelected);
    }
}
