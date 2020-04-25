import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SectionInterface } from './section.interface';

@Component({
    selector: 'sections-toolbar',
    styleUrls: ['./sections-toolbar.component.scss'],
    templateUrl: './sections-toolbar.component.html'
})
export class SectionsToolbarComponent implements OnInit {
    @Input() sections: SectionInterface[];

    search: string = '';
    smallScreen: boolean = window.innerWidth < 992;

    @Input()
    sideCollapsed: boolean = window.innerWidth < 576;

    @Output()
    readonly sideCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.onActivate();
    }

    onKeypressHandler(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            const _event = new MouseEvent('click');
            event.target.dispatchEvent(_event);
        }
    }

    onActivate() {
        if (this.smallScreen && !this.sideCollapsed) {
            this.sideCollapsed = true;
            this.sideCollapsedChange.emit(this.sideCollapsed);
        }
    }

    windowSize() {
        if (window.innerWidth < 992) {
            this.smallScreen = true;
            this.onActivate();
        } else {
            this.smallScreen = false;
            this.sideCollapsed = false;
        }
        this.sideCollapsedChange.emit(this.sideCollapsed);
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.windowSize();
    }
}
