import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-shellbar-search',
    templateUrl: './shellbar-search.component.html',
    styleUrls: ['./shellbar-search.component.scss']
})
export class ShellbarSearchComponent implements OnInit, OnChanges {
    @Input()
    showInput: boolean;

    @Input()
    mobileMode: boolean;

    @Output()
    cancleClick = new EventEmitter();

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef<HTMLInputElement>;

    currentStyle: string;

    /** @hidden */
    private _applyMobileMode(): void {
        if (this.mobileMode) {
            this.showInput = true;
            console.log('ngOnChange calling mobile mode');
            this.searchInputElement.nativeElement.style.cssText = `padding: 0 1.25rem; position: absolute; left: 0; top: 0;`;
        } else {
            this.showInput = false;
            this.searchInputElement.nativeElement.style.cssText = this.currentStyle;
        }
    }

    onCancleClick(): void {
        this.cancleClick.emit(false);
    }

    constructor() {}

    ngOnInit(): void {
        this.currentStyle = this.searchInputElement.nativeElement.style.cssText;
    }
    ngOnChanges(): void {
        this._applyMobileMode();
    }
}
