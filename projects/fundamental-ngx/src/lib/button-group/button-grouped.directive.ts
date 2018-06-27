import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fd-button-grouped]',
    host: {
        '[class]':
            '"fd-button--grouped" + (size ? " fd-button--" + size : "") + (glyph ? " sap-icon--" + glyph : "") + (compact ? " fd-button--compact" : "") + (state ? " is-" + state : "")'
    }
})
export class ButtonGroupedDirective {
    @Input() id: string;

    @Input() size: string;

    @Input() glyph: string;

    @Input() state: string;

    @Input() compact: boolean = false;
}
