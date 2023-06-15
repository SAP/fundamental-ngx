import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';
import { MenuItemComponent } from '../../menu-item/menu-item.component';
import { DomPortal } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';

@Directive({
    selector: 'li[fd-menu-item][fdMenuSegmentedButtonOption]',
    standalone: true
})
export class SegmentedButtonOptionDirective<T> {
    /** @hidden */
    @Input() value: T;

    /** @hidden */
    private _clicked = new Subject<void>();
    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    readonly menuItem = inject(MenuItemComponent, { host: true });

    /** @hidden */
    readonly clicked: Observable<void> = this._clicked.asObservable();

    /** @hidden */
    readonly renderer2 = inject(Renderer2);

    /** @hidden */
    private readonly _dotElement: HTMLSpanElement;

    /** @hidden */
    constructor() {
        this._dotElement = this.renderer2.createElement('span');
        this.renderer2.addClass(this._dotElement, 'fd-menu__active-dot');
        this.renderer2.setAttribute(this._dotElement, 'role', 'presentation');
        this.renderer2.appendChild(this.elementRef.nativeElement, this._dotElement);
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    _onClick($event: MouseEvent | KeyboardEvent): void {
        $event.preventDefault();
        this._clicked.next();
    }

    /** @hidden */
    set selected(isSelected: boolean) {
        const addonDirective = this.menuItem.menuInteractive.startAddon;
        console.log(addonDirective.elementRef);
        const addonGlyph = addonDirective._addonGlyph;
        this._dotElement.style.display = isSelected ? 'block' : 'none';
        isSelected
            ? this._dotElement.removeAttribute('aria-hidden')
            : this._dotElement.setAttribute('aria-hidden', 'true');
        addonGlyph.renderElement(new DomPortal(this._dotElement)).subscribe();
    }
}
