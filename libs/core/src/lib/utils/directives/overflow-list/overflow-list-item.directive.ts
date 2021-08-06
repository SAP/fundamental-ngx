import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fdOverflowListItem, fd-overflowList-item]'
})
export class OverflowListItemDirective {

  constructor(
      public el: ElementRef,
  ) { }

}
