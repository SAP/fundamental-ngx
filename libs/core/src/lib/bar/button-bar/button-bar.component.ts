import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import { BaseButton, ButtonType } from '../../button/base-button';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'fd-button-bar',
  template: `
      <button fd-button
              [type]="type"
              [glyphPosition]="glyphPosition"
              [glyph]="glyph"
              [compact]="compact"
              [fdType]="fdType"
              [label]="label"
              [fdMenu]="fdMenu"
              [disabled]="disabled"
      >
          <ng-content></ng-content>
      </button>
  `
})
export class ButtonBarComponent extends BaseButton {
    /** Whether the element should take the whole width of the container. */
    @Input()
    @HostBinding('class.fd-bar__element--full-width')
    fullWidth = false;

    /** Whether to apply compact mode to the button.
     * Default value is set to true
     */
    @Input()
    compact = true;

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Default value is set to 'transparent'
     */
    @Input()
    fdType: ButtonType = 'transparent';

    /** @hidden */
    @HostBinding('class.fd-bar__element')
    _barElement = true;

    /** @hidden */
    @ViewChild(ButtonComponent)
    _buttonComponent: ButtonComponent;
}
