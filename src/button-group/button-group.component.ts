import { Directive, Input, Component } from '@angular/core';

@Component({
    selector: 'fd-button-group',
    template: `
    <div class="fd-button-group" role="group" aria-label="Group label">
      <ng-content></ng-content>
    </div>
  `
})
export class ButtonGroupComponent {}

@Directive({
    selector: '[fd-button-grouped]',
    host: {
        '[class]':
            '"fd-button--grouped" + (size ? " fd-button--" + size : "") + (glyph ? " sap-icon--" + glyph : "") + (compact ? " fd-button--compact" : "") + (state ? " is-" + state : "")'
    }
})
export class ButtonGrouped {
    @Input() id: string;

    @Input() size: string;

    @Input() glyph: string;

    @Input() state: string;

    @Input() compact: boolean = false;
}
