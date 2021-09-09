import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fdOverflowListItem], [fd-overflowList-item]'
})
export class OverflowListItemDirective {

  constructor(
      public el: ElementRef,
  ) { }

}
