import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef, EventEmitter,
    Input,
    OnInit,
    Optional, Output,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '../utils/services/rtl.service';
import { BehaviorSubject } from 'rxjs';
import { Placement } from 'popper.js';


@Component({
    selector: 'fd-action-sheet',
    host: {
        class: 'fd-action-sheet'
    },
    templateUrl: './action-sheet.component.html',
    styleUrls: ['./action-sheet.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionSheetComponent implements AfterContentInit {

    /** Whenever links wrapped inside overflow should be displayed in compact mode  */
    @Input()
    compact = false;


    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    placement$ = new BehaviorSubject<Placement>('bottom-start');

    /** @hidden */
    ngAfterContentInit(): void {
    }

    /**
     * Function is called every time popover changes open attribute
     */
    public openChanged(isOpen: boolean): void {
        this.isOpenChange.emit(isOpen);
    }


}
