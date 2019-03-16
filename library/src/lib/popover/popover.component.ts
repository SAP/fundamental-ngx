import {
    Component,
    Input,
    ElementRef,
    OnInit,
    Output,
    EventEmitter,
    ChangeDetectorRef
} from '@angular/core';
import { HashService } from '../utils/hash.service';
import Popper, { PopperOptions } from 'popper.js';

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
    popoverClosed: EventEmitter<any> = new EventEmitter<any>();

    id: string;

    constructor(private hasher: HashService,
                private eRef: ElementRef,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.id = this.hasher.hash();
    }

    close(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.popoverClosed.emit();
            this.cdRef.detectChanges();
        }
    }

    open(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.cdRef.detectChanges();
        }
    }

}
