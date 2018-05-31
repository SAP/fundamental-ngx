import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-inline-help',
  template:`
      <span class="fd-inline-help" >
        <span [ngClass]="(position ? 'fd-inline-help__content fd-inline-help__content--' + position : 'fd-inline-help__content fd-inline-help__content--bottom-right')" >  
          <ng-content></ng-content>  
        </span>
      </span>
  `
})
export class InlineHelp {
  @Input()
  position: string;
}

