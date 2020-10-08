import { ScrollDispatcher } from '@angular/cdk/scrolling';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { DynamicPageBackgroundType, CLASS_NAME, DynamicPageResponsiveSize } from '../constants';
import { DynamicPageService } from '../dynamic-page.service';
import { addClassNameToElement } from '../utils';

@Component({
    selector: 'fdp-dynamic-page-content',
    templateUrl: './dynamic-page-content.component.html',
    styleUrls: ['./dynamic-page-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageContentComponent implements OnInit {
    /**
     * label for the tab. If label is provided, tab navigation will be internally set up.
     */
    @Input()
    tabLabel: string;

    /**
     *  sets the selected tab index as the active one.
     */
    @Input()
    activeTab = 0;

    /**
     * sets background for content to List, Transparent or Solid background color.
     * Default is `solid`.
     */
    @Input()
    set background(backgroundType: DynamicPageBackgroundType) {
        if (backgroundType) {
            this._background = backgroundType;
            this._setBackgroundStyles(backgroundType);
        }
    }

    get background(): DynamicPageBackgroundType {
        return this._background;
    }

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    @Input()
    set size(sizeType: DynamicPageResponsiveSize) {
        if (sizeType) {
            this._size = sizeType;
            this._setSize(sizeType);
        }
    }

    get size(): DynamicPageResponsiveSize {
        return this._size;
    }

    /**
     * the underlying content template
     */
    @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

    /**
     * @hidden
     * used internally to set margin top correctly for tabbed content
     */
    contentTop: string;

    /**
     * @hidden
     * tracking the background value
     */
    private _background: DynamicPageBackgroundType;

    /**
     * @hidden
     * tracks the size for responsive padding
     */
    private _size: DynamicPageResponsiveSize;

    constructor(
        public _elementRef: ElementRef<HTMLElement>,
        public _renderer: Renderer2,
        public scrollDispatcher: ScrollDispatcher,
        public zone: NgZone,
        public _dynamicPageService: DynamicPageService
    ) {}

    /**@hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageContent);
        if (this.background) {
            this._setBackgroundStyles(this.background);
        }
        if (this.size) {
            this._setSize(this.size);
        }
    }

    /**
     * get reference to this element
     */
    getElementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /**
     * @hidden
     * sets the style classes for background property
     * @param background
     */
    private _setBackgroundStyles(background: DynamicPageBackgroundType): void {
        switch (background) {
            case 'transparent':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentTransparentBg);
                break;
            case 'list':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentListBg);
                break;
            case 'solid':
            default:
                this._removeClassNameToHostElement(CLASS_NAME.dynamicPageContentTransparentBg);
                this._removeClassNameToHostElement(CLASS_NAME.dynamicPageContentListBg);
                break;
        }
    }

    /**
     * @hidden
     * sets the padding classes
     * @param sizeType
     */
    private _setSize(sizeType: DynamicPageResponsiveSize): void {
        switch (sizeType) {
            case 'small':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaSmall);
                break;
            case 'medium':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaMedium);
                break;
            case 'large':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaLarge);
                break;
            case 'extra-large':
            default:
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageContentAreaExtraLarge);
                break;
        }
    }

    /**@hidden */
    private _removeClassNameToHostElement(className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }
}
