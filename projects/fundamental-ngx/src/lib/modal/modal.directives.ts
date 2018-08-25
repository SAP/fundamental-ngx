import { ElementRef, Directive, OnChanges, OnInit, Input, Optional, SimpleChanges } from '@angular/core';
import { DialogRef } from '@angular/cdk-experimental/dialog';
import { ModalService } from './modal.service';

/* Copied and modified to our needs from google material2 */

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: `button[fd-modal-close], button[fdModalClose]`,
  exportAs: 'fdModalClose',
  host: {
    '(click)': 'close()',
    '[attr.aria-label]': 'ariaLabel',
    'type': 'button' // Prevents accidental form submits.
  }
})
export class ModalClose implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string = 'Close dialog';

  /** Modal close input. */
  // tslint:disable-next-line:no-input-rename
  @Input('fd-modal-close') modalResult: any;

  // tslint:disable-next-line:no-input-rename
  @Input('fdModalClose') _fdModalClose: any;

  constructor(
     @Optional() public modalRef: DialogRef<any>,
     private _elementRef: ElementRef,
     private _modal: ModalService) {
  }

  ngOnInit() {
      if (!this.modalRef) {
        // tslint:disable-next-line:no-non-null-assertion
        this.modalRef = getClosestDialog(this._elementRef, this._modal.openDialogs)!;
      }
  }

  ngOnChanges(changes: SimpleChanges) {
      const proxiedChange = changes._fdDialogClose || changes._fdDialogCloseResult;

      if (proxiedChange) {
        this.modalResult = proxiedChange.currentValue;
      }
  }

  close() {
      this.modalRef.close(this.modalResult);
  }
}

/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openModals References to the currently-open dialogs.
 */
function getClosestDialog(element: ElementRef, openModals: DialogRef<any>[]) {
    let parent: HTMLElement | null = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('fd-modal')) {
      parent = parent.parentElement;
    }
    const openModal = openModals.find(modal => modal.id === parent.id);
    if (!openModal) {
     return openModals[openModals.length - 1]
    }
    return parent ? openModal : null;
}
