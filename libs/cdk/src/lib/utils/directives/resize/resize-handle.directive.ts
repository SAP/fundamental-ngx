import { Directive, ElementRef } from '@angular/core';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdResizeHandle], [fd-resize-handle]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkResizeHandle]', '[fdResizeHandle], [fd-resize-handle]')
        }
    ]
})
export class DeprecatedResizeHandleDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkResizeHandle], [fdResizeHandle], [fd-resize-handle]',
    standalone: true
})
export class ResizeHandleDirective {
    /** @hidden */
    constructor(public elementRef: ElementRef) {}
}
