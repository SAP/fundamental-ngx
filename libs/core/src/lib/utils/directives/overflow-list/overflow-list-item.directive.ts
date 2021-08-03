import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fdOverflowListItem]'
})
export class OverflowListItemDirective {

  constructor(
      public el: ElementRef,
  ) { }

}
