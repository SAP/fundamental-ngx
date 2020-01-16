import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ContentChild, AfterContentInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { MessageStates } from '../form-message/form-message.component';
import { PopoverComponent } from '../../popover/public_api';
import { FormMessageComponent } from '../form-message/form-message.component';
import { FormControlDirective } from '../form-control/form-control.directive';

@Component({
  selector: 'fd-form-input-message-group',
  templateUrl: './form-input-message-group.component.html',
  styleUrls: ['./form-input-message-group.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FormInputMessageGroupComponent implements OnInit, AfterContentInit {

  @Input() state: string;
  @Input() compact: boolean = false;
  type: MessageStates;

  /** Whether form message should be opened */
  @Input()
  open: boolean = false;

  /** @hidden */
  @ViewChild(PopoverComponent, { static: false })
  popoverRef: PopoverComponent;

  @ContentChild(FormMessageComponent, { static: false }) message: FormMessageComponent;
  @ContentChild(FormControlDirective, { read: ElementRef, static: false }) input: FormControlDirective;

  @Output()
  readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  /** @hidden */
  openChangeHandle(open: boolean): void {
    this.open = open;
    this.openChange.emit(this.open);
    // this.onTouched();
    // if (this.open) {
    //     this.focusTrap.activate();
    // } else {
    //     this.focusTrap.deactivate();
    // }
  }

  constructor() { }

  ngOnInit() {
    if (this.state === 'valid') {
      this.type = 'success';
    }
    else if (this.state === 'invalid') {
      this.type = 'error';
    }
    else if (this.state === 'warning') {
      this.type = 'warning';
    }
    else if (this.state === 'information') {
      this.type = 'information';
    }
  }

  ngAfterContentInit() {
    console.log(this.input)
  }

}
