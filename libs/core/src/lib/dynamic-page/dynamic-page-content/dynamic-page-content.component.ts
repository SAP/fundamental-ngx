import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { DYNAMIC_PAGE_CLASS_NAME } from '../constants';
import { addClassNameToElement } from '../utils';

@Component({
    selector: 'fd-dynamic-page-content',
    templateUrl: './dynamic-page-content.component.html',
    styleUrls: ['./dynamic-page-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageContentComponent implements OnInit {
    /**
     * label for the tab. If label is provided, tab navigation will be internally set up.
     */
    @Input()
    tabLabel: string;

    /**
     * a unique identifier for this content
     */
    @Input()
    id: string;

    /** @hidden */
    _showSpacer = false;

    /** @hidden */
    constructor(
        public readonly _renderer: Renderer2,
        public readonly elementRef: ElementRef<HTMLElement>,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(DYNAMIC_PAGE_CLASS_NAME.dynamicPageContent);
    }

    /** @hidden */
    _toggleSpacer(state: boolean): void {
        this._showSpacer = state;

        this._cdr.markForCheck();
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this.elementRef.nativeElement, className);
    }
}
