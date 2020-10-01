import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '../utils/services/rtl.service';
import { BehaviorSubject } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
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
export class ActionSheetComponent implements AfterContentInit, OnInit {

    /** Whenever links wrapped inside overflow should be displayed in compact mode  */
    @Input()
    compact = false;

    /** @hidden */
    @ViewChild(MenuComponent)
    menuComponent: MenuComponent;


    /** @hidden */
    placement$ = new BehaviorSubject<Placement>('bottom-start');

    /** @hidden */
    ngAfterContentInit(): void {
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.rtlService) {
            this.rtlService.rtl.subscribe((value) => this.placement$.next(value ? 'bottom-end' : 'bottom-start'));
        }
    }

    constructor(public elementRef: ElementRef, @Optional() private rtlService: RtlService) {}

}
