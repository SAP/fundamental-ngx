import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fd-button]',
  host: {
    '[class]': '"fd-button" + (size ? " fd-button--" + size : "") + (glyph ? " sap-icon--" + glyph : "") + (type ? " fd-button--" + type : "") + (semantic ? " fd-button--" + semantic : "") + (state ? " is-" + state : "")'
  }
})
export class Button {

  @Input()
  size;

  @Input()
  glyph;

  @Input()
  type;

  @Input()
  semantic;

  @Input()
  state;

}
