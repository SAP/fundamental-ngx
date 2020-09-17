import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, Input } from '@angular/core';

import { CLASS_NAME } from '../../constants';

@Component({
    selector: 'fdp-dynamic-page-summarized-title',
    templateUrl: './dynamic-page-summarized-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageSummarizedTitleComponent implements OnInit {
    _summaryLine: string;
    @Input()
    set summaryLine(summaryLine: string) {
        if (summaryLine) {
            this._summaryLine = summaryLine;
        }
    }

    get summaryLine(): string {
        return this._summaryLine;
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageKeyInfo);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
