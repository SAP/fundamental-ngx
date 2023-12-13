import { AfterContentInit, ContentChild, Directive, ElementRef } from '@angular/core';
import { BusyIndicatorComponent } from '../busy-indicator.component';
import { FD_BUSY_INDICATOR_COMPONENT } from '../tokens';

const messageToastClass = 'fd-message-toast';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-busy-indicator-extended]',
    standalone: true
})
export class BusyIndicatorExtendedDirective implements AfterContentInit {
    /** @ignore */
    @ContentChild(FD_BUSY_INDICATOR_COMPONENT)
    busyIndicator: BusyIndicatorComponent;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}

    /** @ignore */
    ngAfterContentInit(): void {
        this._appendCssToParent();
    }

    /** @ignore */
    private _appendCssToParent(): void {
        const hasLabel = this.busyIndicator.label;
        if (!hasLabel) {
            return;
        }
        const classList = this.elementRef.nativeElement.parentElement?.classList;
        if (classList) {
            classList.add('fd-busy-indicator-extended');
            if (classList.contains(messageToastClass)) {
                classList.add('fd-busy-indicator-extended--message-toast');
            }
        }
    }
}
