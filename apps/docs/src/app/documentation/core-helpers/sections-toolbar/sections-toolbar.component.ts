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
    themes = [{
        id: 'sap_fiori_3',
        name: 'Fiori 3'
    }, {
        id: 'sap_fiori_3_dark',
        name: 'Fiori 3 Dark'
    }, {
        id: 'sap_fiori_3_hcb',
        name: 'High Contrast Black'
    }, {
        id: 'sap_fiori_3_hcw',
        name: 'High Contrast White'
    }];

    selectedTheme: string;
    smallScreen: boolean = window.innerWidth < 992;

    @Input()
    sideCollapsed: boolean = window.innerWidth < 576;

    @Output()
    readonly sideCollapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.onActivate();
        this.selectedTheme = this.themes[0].id;
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

    selectTheme() {
        const cssLink: any = document.getElementById('themes');
        cssLink.href = 'assets/' + this.selectedTheme + '.css';
    }
}
