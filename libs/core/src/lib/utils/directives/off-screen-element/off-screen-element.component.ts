import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export type ariaLiveAssertionType = 'polite' | 'assertive' | 'off';
export type ariaLiveRelevantType = 'additions' | 'removals' | 'text' | 'all';

/**
 * This directives puts any html element far left of the screen, so it is not visible.
 * It includes aria-live attribute, so screen reader will be able to read any change in that element.
 */

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[fd-off-screen], [fdOffScreen]',
  exportAs: 'fdOffScreen',
  styleUrls: ['./off-screen-element.component.scss'],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'fd-off-screen'
  }
})
export class OffScreenElementComponent {
  /** set value for aria-live attribute. possible values are 'polite', 'assertive' and 'off'. Default is 'polite' */
  @Input()
  @HostBinding('attr.aria-live')
  ariaLive: ariaLiveAssertionType = 'polite'

  /** set value for aria-atomic attribute. possible values are true and false. Default value is 'true' */
  @Input()
  @HostBinding('attr.aria-atomic')
  atomic = true

  /** set value for aria-relevant attribute. possible values are 'additions' | 'removals' | 'text' | 'all' */
  @Input()
  @HostBinding('attr.aria-relevant')
  relevant: ariaLiveRelevantType | ariaLiveRelevantType[];

  /** @hidden */
  constructor() {}
}
