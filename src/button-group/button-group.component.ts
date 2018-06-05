import { Directive, Input, Component } from '@angular/core';

@Component({
    selector: 'fd-button-group',
    templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {}

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
