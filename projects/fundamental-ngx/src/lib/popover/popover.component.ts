import { Component, Input, HostListener, ElementRef, Inject, OnInit } from '@angular/core';
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

    id: string;

    isOpen: boolean = false;

    close() {
        if (this.isOpen) {
            this.isOpen = false;
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
            if (this.isTimePicker) {
                if (!this.isOpen) {
                    this.isOpen = true;
                }
            } else {
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
