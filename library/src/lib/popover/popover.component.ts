import {
    Component,
    Input,
    HostListener,
    ElementRef,
    Inject,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html'
})
export class PopoverComponent implements OnInit, AfterViewInit {
    @Input()
    alignment: string = '';
    @Input()
    arrow: boolean = true;
    @Input()
    disabled: boolean = false;
    @Input()
    isDropdown: boolean = false;
    @Input()
    isTimePicker: boolean = false;
    @Input()
    isSearchInput: boolean = false;
    @Input()
    glyph: string;
    @Input() // TODO: deprecated, leaving for backwards compatibility
    size: string;
    @Input()
    btnType: string = '';
    @Input()
    isOpen: boolean = false;
    @Input()
    compact: boolean = false;
    @Input()
    standard: boolean = false;

    @Output()
    popoverClosed: EventEmitter<any> = new EventEmitter<any>();

    popoverControlIsTabIndexed: boolean = false;

    @ViewChild('popoverControlWrapper')
    popoverControl: ElementRef;

    id: string;

    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.popoverClosed.emit();
        }
    }

    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.close();
    }

    onKeypressHandler(event) {
        if (this.isSearchInput) {
            if (!this.isOpen) {
                this.isOpen = true;
            }
        } else if (!this.popoverControlIsTabIndexed && (event.code === 'Space' || event.code === 'Enter')) {
            event.preventDefault();
            if (!this.isTimePicker) {
                if (this.isOpen) {
                    this.popoverClosed.emit();
                }
                this.isOpen = !this.isOpen;
            }
        }
    }

    @HostListener('document:click', ['$event'])
    onClickHandler(e: MouseEvent) {
        const target = e.target;
        if (this.eRef.nativeElement.contains(target)) {
            if (!this.isTimePicker && !this.isSearchInput) {
                if (this.isOpen) {
                    this.popoverClosed.emit();
                }
                this.isOpen = !this.isOpen;
            } else if (this.isSearchInput) {
                const targetElement = <HTMLElement>target;
                if (!this.isOpen) {
                    this.isOpen = true;
                } else if (this.isOpen && targetElement.classList && targetElement.classList.contains('sap-icon--search')) {
                    this.isOpen = false;
                }
            }
        } else {
            this.close();
        }
    }

    constructor(
        @Inject(HashService) private hasher: HashService,
        private eRef: ElementRef,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.id = this.hasher.hash();
    }

    ngAfterViewInit() {
        /*
         check if the popover control contents have a tab index, and if not, add tabindex, role="button", and keypress handler (see HTML)
         */
        if (
            (this.popoverControl &&
                this.popoverControl.nativeElement &&
                this.popoverControl.nativeElement.children &&
                this.popoverControl.nativeElement.children[0] &&
                this.popoverControl.nativeElement.children[0].children &&
                this.popoverControl.nativeElement.children[0].children[0] &&
                this.popoverControl.nativeElement.children[0].children[0].tabIndex >= 0) ||
            this.isTimePicker
        ) {
            this.popoverControlIsTabIndexed = true;
        }
        this.cd.detectChanges();
    }
}
