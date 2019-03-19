import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ViewChild
} from '@angular/core';
import { HashService } from '../utils/hash.service';
import Popper, { PopperOptions } from 'popper.js';
import { PopoverDirective } from './popover-directive/popover.directive';

@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html'
})
export class PopoverComponent implements OnInit {
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
    options: PopperOptions = Popper.Defaults;

    @Input()
    focusTrapped: boolean = true;

    @Input()
    closeOnOutsideClick: boolean = true;

    @Input()
    closeOnEscapeKey: boolean = true;

    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    id: string;

    private isSetup: boolean = false;

    constructor(private hasher: HashService) {}

    ngOnInit(): void {
        this.id = this.hasher.hash();
        this.isSetup = true;

        if (this.options.modifiers && this.options.modifiers.preventOverflow) {
            this.options.modifiers.preventOverflow.escapeWithReference = true;
        }
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

}
