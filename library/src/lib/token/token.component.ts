import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    host: {
        'class': 'fd-token',
        'role': 'button',
        'display': 'inline-block'
    }
})
export class TokenComponent {

    @ViewChild('contentContainer')
    contentContainer: ElementRef;

    @Output()
    onCloseClick: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('click', ['$event'])
    clickHandler(event): void {
        if (this.contentContainer) {
            if (this.elRef.nativeElement.contains(event.target) && !this.contentContainer.nativeElement.contains(event.target)) {
                this.onCloseClick.emit();
            }
        }
    }

    constructor(private elRef: ElementRef) {}

}


