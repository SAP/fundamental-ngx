import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fd-form-input-message-group',
  templateUrl: './form-input-message-group.component.html',
  styleUrls: ['./form-input-message-group.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FormInputMessageGroupComponent {
  //To allow user to determine what event he wants to trigger the messages to show
  @Input() triggers: string[] = ['click'];

  // Allows the user to decide if he wants to keep the error message after they click outside
  @Input() closeOnOutsideClick: boolean = true;

}
