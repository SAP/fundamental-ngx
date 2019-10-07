import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { SectionInterface } from './section.interface';

@Component({
    selector: 'sections-toolbar',
    styleUrls: ['./sections-toolbar.component.scss'],
    templateUrl: './sections-toolbar.component.html'
})
export class SectionsToolbarComponent {

    @Input() sections: SectionInterface[];

    search: string = '';
    smallScreen: boolean = window.innerWidth < 992;
    sideCollapsed: boolean = window.innerWidth < 576;

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
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.windowSize();
    }
}
