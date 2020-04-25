import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { PopoverFillMode } from '../../popover/popover-directive/popover.directive';
import { RtlService } from '../../utils/services/rtl.service';
import { Observable, of } from 'rxjs';
import { Placement } from 'popper.js';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-form-input-message-group',
    templateUrl: './form-input-message-group.component.html',
    styleUrls: ['./form-input-message-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputMessageGroupComponent {
    /*
     * To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = ['click'];

    /*
     * Allows the user to decide if he wants to keep the error message after they click outside
     *  Whether the popover should close when a click is made outside its boundaries.
     */
    @Input()
    closeOnOutsideClick: boolean = true;

    /**
     * Preset options for the message body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode;

    /** Whether the message is open. Can be used through two-way binding. */
    @Input()
    isOpen: boolean = false;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    public placement$: Observable<Placement>;

    constructor(@Optional() private _rtlService: RtlService) {
        this._createRtlObservable();
    }

    /**
     * Function is called every time message changes isOpen attribute
     */
    public openChanged(isOpen: boolean) {
        this.isOpenChange.emit(isOpen);
    }

    /** @hidden */
    private _createRtlObservable(): void {
        this.placement$ = this._rtlService
            ? this._rtlService.rtl.pipe(map((isRtl) => (isRtl ? 'bottom-end' : 'bottom-start')))
            : of('bottom-start');
    }
}
