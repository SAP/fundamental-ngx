import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    host: {
        'class': 'fd-token',
        'role': 'button'
    }
})
export class TokenComponent implements OnInit {

    @ViewChild('contentContainer')
    contentContainer: ElementRef;

    @Output()
    onCloseClick: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    id: string;

    @HostListener('click', ['$event'])
    clickHandler(event): void {
        if (this.contentContainer) {
            if (this.elRef.nativeElement.contains(event.target) && !this.contentContainer.nativeElement.contains(event.target)) {
                this.onCloseClick.emit(this.id);
            }
        }
    }

    constructor(private elRef: ElementRef, private hash: HashService) {}

    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hash.hash();
        }
    }

}


