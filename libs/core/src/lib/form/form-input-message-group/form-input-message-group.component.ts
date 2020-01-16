import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MessageStates } from '../form-message/form-message.component';

@Component({
  selector: 'fd-form-input-message-group',
  templateUrl: './form-input-message-group.component.html',
  styleUrls: ['./form-input-message-group.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FormInputMessageGroupComponent {

  @Input() state: string;
  @Input() compact: boolean = false;
  type: MessageStates;

  /** Whether form message should be opened */
  @Input()
  open: boolean = false;

  @Output()
  readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
}
