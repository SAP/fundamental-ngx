import { Component, Input } from '@angular/core';

@Component({
    selector: 'rtl-toggle',
    template: `
        <div>
            <label class="fd-form__label " for="{{id}}">
                <span class="fd-toggle fd-toggle--xxs fd-form__control">
                    <input type="checkbox" name="" value="" id="{{id}}" class="toggle-rtl {{id}}" [attr.aria-controls]="label" (change)="onChange($event)" [(ngModel)]="isChecked">
                    <span class="fd-toggle__switch" role="presentation"></span>
                </span>
                Simulate RTL
            </label>  
        </div>
  `,
    styles: [``]
})
export class RTLToggleComponent {

  id = (Date.now() + 1) + '';
  isChecked:boolean = false;
  @Input() label:string;

  onChange(event) {
    let dirValue = this.isChecked ? 'rtl' : 'ltr';
    document.getElementById(this.label).dir = dirValue;
    //console.log('dir: '+ dirValue);
  }
}
