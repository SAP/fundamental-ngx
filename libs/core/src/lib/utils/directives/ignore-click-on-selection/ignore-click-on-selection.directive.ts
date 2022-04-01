import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IgnoreClickOnSelectionDirectiveToken } from './tokens';

@Directive({
    selector: '[fdIgnoreClickOnSelection]',
    providers: [
        {
            provide: IgnoreClickOnSelectionDirectiveToken,
            useExisting: IgnoreClickOnSelectionDirective
        }
    ]
})
export class IgnoreClickOnSelectionDirective {
    constructor(@Inject(DOCUMENT) private document: Document, private _elementRef: ElementRef<HTMLElement>) {}

    @HostListener('click', ['$event'])
    clicked($event: MouseEvent): void {
        const selection = this.document.getSelection();
        if (selection.toString()) {
            if (
                this._elementRef.nativeElement.isSameNode(selection.anchorNode) ||
                this._elementRef.nativeElement.isSameNode(selection.anchorNode.parentElement)
            ) {
                $event.stopPropagation();
                $event.preventDefault();
            }
        }
    }

    nativeElement(): Element {
        return this._elementRef.nativeElement;
    }
}
