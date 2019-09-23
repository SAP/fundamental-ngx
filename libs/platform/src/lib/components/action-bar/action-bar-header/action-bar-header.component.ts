import { Component, OnInit, Directive, AfterContentInit, ChangeDetectionStrategy, Input, Output, Inject, EventEmitter, ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActionbarService } from '../actionbar.service';
//import { HTMLDirectionObserverService } from '../../../common/html-direction-observer.service';
// {
// DOCUMENT
//} from '@angular/common';


@Directive({
  selector: 'fdpAutofocus'
})
export class AutofocusDirective implements AfterContentInit {

  @Input() autoFocus: boolean;
  constructor(private el: ElementRef) {
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 500)

  }

}

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
  @Input() actionbarTitle: string;


  editMode: boolean = false;

  /**
   * Actionbar description
   */
  @Input() actionbarDescription: string;
  /**
   * Show "back" button.
   */
  @Input() showBackButton = false;

  /**
   * "back" button label.
   */
  @Input() backButtonLabel = 'Go Back';


  /**
   * Emitted event when "back" button is clicked.
   */
  @Output() backButtonClick: EventEmitter<void> = new EventEmitter();

  /**
   * Emitted event when input textbox out of focus.
   */

  @Output() onRenameTitle: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emitted event when action button is clicked.
   */
  @Output() actionClick: EventEmitter<void> = new EventEmitter();

  @ViewChild('inputTitle') inputTitle: ElementRef;

  //public direction = 'ltr';

  constructor(
    public cd: ChangeDetectorRef, private actionbarservice: ActionbarService) {

    // document.addEventListener('click', this.outSideClick);
    // this.htmlDirectionObserverService.getSubject().subscribe(dir => {
    // this.direction = dir;
    // this.cd.detectChanges();
    // });

  }

  ngOnInit() {
    this.actionbarservice.castEditMode.subscribe(editModeOn => {
      this.editMode = editModeOn;
      this.cd.detectChanges();

    });

  }

  renameTitle() {
    this.editMode = true;
    this.actionbarservice.setEditMode(this.editMode);
    this.cd.detectChanges();
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.inputTitle.nativeElement.focus();
    }, 0);
  }
  onFocusOut() {
    this.editMode = false;
    this.actionbarservice.setEditMode(this.editMode);
    this.onRenameTitle.emit(this.actionbarTitle);
    this.cd.detectChanges();
  }
  outSideClick = ($event: Event) => {

    if (!this.editMode) {
      this.editMode = false;
      this.actionbarservice.setEditMode(this.editMode);
      this.cd.detectChanges();
    }

  }

}
