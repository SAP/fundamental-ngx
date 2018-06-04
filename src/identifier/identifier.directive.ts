import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fd-identifier]',
    host: {
        '[class]':
            '((size) ? " fd-identifier--" + size : "") + ((circle) ? " fd-identifier--circle" : "") + ((transparent) ? " fd-identifier--transparent" : "") + ((colorAccent) ? " fd-has-background-color-accent-" + colorAccent : "") + ((glyph) ? " sap-icon--" + glyph : "") ',
        role: 'presentation'
    }
})
export class IdentifierDirective {
    @Input() size: string = '';

    @Input() circle: boolean = false;

    @Input() transparent: boolean = false;

    @Input() colorAccent;

    @Input() glyph: string = '';
}
