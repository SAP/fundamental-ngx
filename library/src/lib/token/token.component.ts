import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    host: {
        'class': 'fd-token',
        'role': 'button',
        '[id]': 'id'
    }
})
export class TokenComponent implements OnInit {

    /** @hidden */
    @ViewChild('contentContainer')
    contentContainer: ElementRef;

    /** @Input Id of the element. Returned back through the onCloseClick event. */
    @Input()
    id: string;

    /** @Output Emitted when the *x* icon is clicked. Specifically, any pseudo-element. */
    @Output()
    onCloseClick: EventEmitter<string> = new EventEmitter<string>();

    /** @hidden */
    constructor(private elRef: ElementRef, private hash: HashService) {}

    /** @hidden */
    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hash.hash();
        }
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    clickHandler(event): void {
        if (this.contentContainer) {
            if (this.elRef.nativeElement.contains(event.target) && !this.contentContainer.nativeElement.contains(event.target)) {
                this.onCloseClick.emit(this.id);
            }
        }
    }

}


