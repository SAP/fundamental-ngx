import { AfterContentInit, ContentChild, Directive, ElementRef } from '@angular/core';
import { BusyIndicatorComponent } from '../busy-indicator.component';

const messageToastClass = 'fd-message-toast';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-busy-indicator-extended]'
})
export class BusyIndicatorExtendedDirective implements AfterContentInit {
    /** @hidden */
    @ContentChild(BusyIndicatorComponent)
    busyIndicator: BusyIndicatorComponent;

    /** @hidden */
    constructor(private _eleRef: ElementRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._appendCssToParent();
    }

    /** @hidden */
    elementRef(): ElementRef<HTMLElement> {
        return this._eleRef;
    }

    /** @hidden */
    private _appendCssToParent(): void {
        const hasLabel = this.busyIndicator.label;
        if (!hasLabel) {
            return;
        }
        const classList = this.elementRef().nativeElement.parentElement?.classList;
        if (classList) {
            classList.add('fd-busy-indicator-extended');
            if (classList.contains(messageToastClass)) {
                classList.add('fd-busy-indicator-extended--message-toast');
            }
        }
    }
}
