import { AfterContentInit, AfterViewInit, Component, ContentChildren, Optional, QueryList } from '@angular/core';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogFooterBase } from '../base/dialog-footer-base.class';
import { ButtonBarComponent } from '../../bar/button-bar/button-bar.component';
import { ButtonComponent } from '../../button/button.component';
import { startWith } from 'rxjs/operators';

const DialogButtonClass = 'fd-dialog__decisive-button';

/**
 * Building block of the dialog used to create dialog button.
 *
 * ```html
 * <fd-dialog-footer><!--Content--></fd-dialog-footer>
 *
 * Complex footer:
 * <fd-dialog-footer>
 *     <ng-template fdTemplate="footer"><!--Content--></ng-template>
 * </fd-dialog-footer>
 * ```
 * */
@Component({
    selector: 'fd-dialog-footer',
    templateUrl: './dialog-footer.component.html'
})
export class DialogFooterComponent extends DialogFooterBase implements AfterContentInit, AfterViewInit {

    /** @hidden */
    @ContentChildren(ButtonBarComponent)
    buttons: QueryList<ButtonBarComponent>

    /** @hidden */
    constructor(@Optional() public dialogConfig: DialogConfig) {
        super();
        this.dialogConfig = this.dialogConfig || {};
    }

    /** @hidden */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenForButtonChanges();
    }

    /** @hidden */
    private _listenForButtonChanges(): void {
        const addClassToButton = (button: ButtonComponent) => {
            if (button && !button.class.includes(DialogButtonClass)) {
                button.class = button.class + DialogButtonClass;
                button.buildComponentCssClass();
            }
        }

        this.buttons.changes.pipe(startWith(1)).subscribe(
            _ => this.buttons.forEach(button => {
                addClassToButton(button._buttonComponent)
            })
        );
    }
}
