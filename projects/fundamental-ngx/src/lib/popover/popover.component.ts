import { Component, Input, HostListener, ElementRef, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-popover',
    templateUrl: './popover.component.html'
})
export class PopoverComponent implements OnInit {
    @Input() disabled: boolean = false;
    @Input() isDropdown: boolean = false;
    @Input() isTimePicker: boolean = false;
    @Input() glyph: string;
    @Input() size: string;
    @Input() btnType: string = '';
    @Input() isOpen: boolean = false;

    @Output() popoverClosed: EventEmitter<any> = new EventEmitter<any>();

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

    @HostListener('document:click', ['$event'])
    onClickHandler(e: MouseEvent) {
        const target = e.target;
        if (this.eRef.nativeElement.contains(target)) {
            if (!this.isTimePicker) {
                if (this.isOpen) {
                    this.popoverClosed.emit();
                }
                this.isOpen = !this.isOpen;
            }
        } else {
            this.close();
        }
    }

    constructor(@Inject(HashService) private hasher: HashService, private eRef: ElementRef) {}

    ngOnInit() {
        this.id = this.hasher.hash();
    }
}
