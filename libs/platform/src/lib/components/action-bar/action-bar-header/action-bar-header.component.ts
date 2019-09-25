import {
  Component, OnInit, Directive, AfterContentInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,

} from '@angular/core';

@Component({
  host: {
    '(document:click)': 'outSideClick($event)',
  },
  selector: 'fdp-action-bar',
  templateUrl: './action-bar-header.component.html',
  styleUrls: ['./action-bar-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarHeaderComponent implements OnInit {

  /**
   * Actionbar title
   */
  @Input() title: string;


  @Input() editMode: boolean = false;

  /**
   * Actionbar description
   */
  @Input() description: string;
  /**
   * Show "back" button.
   */
  @Input() showBackButton = false;

  @Input() displayOnlyMenu = false;

  /**
   * "back" button label.
   */
  @Input() backButtonLabel = 'Go Back';

  @Input() placement: string;

  @Input() actionItems: [any];
  /**
   * Emitted event when "back" button is clicked.
   */
  @Output() backButtonClick: EventEmitter<void> = new EventEmitter();

  /**
   * Emitted event when input textbox out of focus.
   */

  @Output() titleRenamed: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emitted event when action button is clicked.
   */
  @Output() actionClick: EventEmitter<void> = new EventEmitter();

  constructor(
    public cd: ChangeDetectorRef) { }


  ngOnInit() {

  }

  enableEditTitle(editmode: boolean) {
    this.editMode = editmode;
    this.cd.detectChanges();

  }
  onFocusOut() {
    this.editMode = false;
    this.titleRenamed.emit(this.title);
    this.cd.detectChanges();
  }
  outSideClick = ($event: Event) => {

    if (!this.editMode) {
      this.editMode = false;
      this.cd.detectChanges();
    }
  }
}
