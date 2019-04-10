import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChild
} from '@angular/core';
import { HashService } from '../utils/hash.service';
import { Placement, PopperOptions } from 'popper.js';
import { PopoverDirective } from './popover-directive/popover.directive';

@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

    @ViewChild(PopoverDirective)
    directiveRef: PopoverDirective;

    @Input()
    arrow: boolean = false;

    @Input()
    disabled: boolean = false;

    @Input()
    isDropdown: boolean = false;

    @Input()
    appendTo: HTMLElement | 'body';

    @Input()
    triggers: string[] = ['click'];

    @Input()
    placement: Placement;

    @Input()
    glyph: string;

    @Input()
    btnType: string = '';

    @Input()
    isOpen: boolean = false;

    @Input()
    compact: boolean = false;

    @Input()
    standard: boolean = false;

    @Input()
    toolbar: boolean = false;

    @Input()
    options: PopperOptions = {
        placement: 'bottom-start',
        modifiers: {
            preventOverflow: {
                enabled: true,
                escapeWithReference: true,
                boundariesElement: 'scrollParent'
            }
        }
    };

    @Input()
    focusTrapped: boolean = false;

    @Input()
    fillControl: boolean = false;

    @Input()
    closeOnOutsideClick: boolean = true;

    @Input()
    closeOnEscapeKey: boolean = true;

    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    id: string;

    constructor(private hasher: HashService) {}

    ngOnInit(): void {
        this.id = this.hasher.hash();
    }

    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    public close(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    public open(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    public updatePopover(): void {
        this.directiveRef.updatePopper();
    }

}
