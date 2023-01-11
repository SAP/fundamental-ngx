import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IgnoreClickOnSelectionDirectiveToken } from './tokens';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdIgnoreClickOnSelection]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkIgnoreClickOnSelection]', '[fdIgnoreClickOnSelection]')
        }
    ]
})
export class DeprecatedIgnoreClickOnSelectionDirective extends DeprecatedSelector {}

/**
 * Directive will stop propagation and prevent default of click, if selected area is coming from
 * directive's host element. This gives ability to not cancel all clicks on element, just the ones
 * which include selection
 */
@Directive({
    selector: '[fdkIgnoreClickOnSelection], [fdIgnoreClickOnSelection]',
    standalone: true,
    providers: [
        {
            provide: IgnoreClickOnSelectionDirectiveToken,
            useExisting: IgnoreClickOnSelectionDirective
        }
    ]
})
export class IgnoreClickOnSelectionDirective {
    /** @hidden */
    constructor(@Inject(DOCUMENT) private document: Document, private _elementRef: ElementRef<HTMLElement>) {}

    /** Host click listener. Checks for selection existence and if finds one, checks anchor */
    @HostListener('click', ['$event'])
    clicked($event: MouseEvent): void {
        const selection = this.document.getSelection();
        if (selection?.toString()) {
            if (
                selection.anchorNode &&
                (this._elementRef.nativeElement.isSameNode(selection.anchorNode) ||
                    this._elementRef.nativeElement.isSameNode(selection.anchorNode.parentElement))
            ) {
                $event.stopPropagation();
                $event.preventDefault();
            }
        }
    }
}
