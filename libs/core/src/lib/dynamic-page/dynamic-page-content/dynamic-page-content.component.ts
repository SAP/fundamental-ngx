import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    Input,
    OnInit,
    Optional,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { DYNAMIC_PAGE_CLASS_NAME } from '../constants';
import { addClassNameToElement } from '../utils';
import { FD_DYNAMIC_PAGE_COMPONENT, WithDynamicPageFooterComponent } from '../dynamic-page.component';

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
    constructor(
        public _renderer: Renderer2,
        @Inject(FD_DYNAMIC_PAGE_COMPONENT) @Optional() public _dynamicPageComponent: WithDynamicPageFooterComponent,
        private _elementRef: ElementRef<HTMLElement>
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(DYNAMIC_PAGE_CLASS_NAME.dynamicPageContent);
    }

    /** Element reference to host of content dynamic page */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }
}
