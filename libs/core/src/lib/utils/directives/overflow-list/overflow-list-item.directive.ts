import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fdOverflowListItem], [fd-overflow-list-item]'
})
export class OverflowListItemDirective {

  constructor(
      public el: ElementRef,
  ) { }

}
