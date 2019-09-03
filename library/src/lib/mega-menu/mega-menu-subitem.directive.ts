import { ContentChild, Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DefaultMenuItem } from '../menu/default-menu-item';
import { MegaMenuSublinkDirective } from './mega-menu-sublink.directive';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-mega-menu-subitem]'
})
export class MegaMenuSubitemDirective implements DefaultMenuItem {
    /** @hidden */
    @HostBinding('class.fd-mega-menu__subitem')
    fdMegaMenuClass: boolean = true;

    /** @hidden */
    @ContentChild(MegaMenuSublinkDirective)
    link: MegaMenuSublinkDirective;

    /** */
    @Output()
    readonly keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        this.keyDown.emit(event);
    }

    /** @hidden */
    public focus(): void {
        this.link.focus();
    }

    /** @hidden */
    public click(): void {
        this.link.click();
    }
}
