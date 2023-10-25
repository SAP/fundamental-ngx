import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk';
import { ButtonComponent } from '@fundamental-ngx/core/button';

let itemCounter = 0;

@Directive({
    selector: '[fd-button][fdbToolHeaderButton]',
    host: {
        class: 'fd-button--tool-header'
    },
    standalone: true
})
export class ToolHeaderButtonDirective implements HasElementRef {
    /**
     * Whether the button has a badge.
     * @param hasBadge
     */
    @Input()
    set hasBadge(hasBadge: boolean) {
        if (hasBadge) {
            if (!this._badge) {
                this._badge = this.renderer.createElement('span');
                this.renderer.addClass(this._badge, 'fd-button__badge');
                this.renderer.setAttribute(this._badge, 'id', this._badgeId);
                this.renderer.appendChild(this.elementRef.nativeElement, this._badge);
            }
        } else {
            if (this._badge) {
                this.renderer.removeChild(this.elementRef.nativeElement, this._badge);
                this._badge = undefined;
            }
        }
    }

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    private _badgeId = `fdbToolHeaderButton-badge-${itemCounter++}`;

    /** @hidden */
    private _badge?: HTMLElement;

    /** @hidden */
    private renderer: Renderer2 = inject(Renderer2);

    /** @hidden */
    constructor() {
        inject(ButtonComponent, { host: true }).fdType = 'transparent';
    }
}
