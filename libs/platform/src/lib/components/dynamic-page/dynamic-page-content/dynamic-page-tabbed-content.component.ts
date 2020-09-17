import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    NgZone,
    Renderer2,
    ViewChild,
    Input,
    AfterViewInit,
    ContentChild,
    AfterContentInit
} from '@angular/core';
import { DYNAMIC_PAGE_CHILD_TOKEN, BACKGROUND_TYPE, RESPONSIVE_SIZE, CLASS_NAME } from '../constants';
import { DynamicPageService } from '../dynamic-page.service';

@Component({
    selector: 'fdp-dynamic-page-tabbed-content',
    template: '<div class="fd-dynamic-page__content"><ng-content></ng-content></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_PAGE_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicPageTabbedContentComponent)
        }
    ]
})
export class DynamicPageTabbedContentComponent extends CdkScrollable {
    @ViewChild(CdkScrollable)
    cdkScrollable: CdkScrollable;

    _background: BACKGROUND_TYPE;

    @Input()
    set background(backgroundType: BACKGROUND_TYPE) {
        if (backgroundType) {
            this._background = backgroundType;
            this._setBackgroundStyles(backgroundType);
        }
    }

    get background(): BACKGROUND_TYPE {
        return this._background;
    }
    _size: RESPONSIVE_SIZE;

    @Input()
    set size(sizeType: RESPONSIVE_SIZE) {
        if (sizeType) {
            this._size = sizeType;
            this._setSize(sizeType);
        }
    }

    get size(): RESPONSIVE_SIZE {
        return this._size;
    }

    constructor(
        public _elementRef: ElementRef<HTMLElement>,
        public _renderer: Renderer2,
        public scrollDispatcher: ScrollDispatcher,
        public zone: NgZone,
        public _dynamicPageService: DynamicPageService
    ) {
        super(_elementRef, scrollDispatcher, zone);
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPageContent);
    }

    _setBackgroundStyles(background: BACKGROUND_TYPE): any {
        const hostElement = this._elementRef.nativeElement.querySelector('.fd-dynamic-page__content');
        switch (background) {
            case 'transparent':
                this._addClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentTransparentBg);
                break;
            case 'list':
                this._addClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentListBg);
                break;
            case 'solid':
            default:
                this._removeClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentTransparentBg);
                this._removeClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentListBg);
                break;
        }
    }
    _setSize(sizeType: RESPONSIVE_SIZE): any {
        const hostElement = this._elementRef.nativeElement.querySelector('.fd-dynamic-page__content');

        switch (sizeType) {
            case 'small':
                this._addClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentAreaSmall);
                break;
            case 'medium':
                this._addClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentAreaMedium);
                break;
            case 'large':
                this._addClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentAreaLarge);
                break;
            case 'extra-large':
            default:
                this._addClassNameToHostElement(hostElement, CLASS_NAME.dynamicPageContentAreaExtraLarge);
                break;
        }
    }

    /**@hidden */
    protected _addClassNameToHostElement(element: Element, className: string): void {
        this._renderer.addClass(element, className);
    }
    /**@hidden */
    protected _removeClassNameToHostElement(element: Element, className: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
    /**@hidden */
    protected _setAttributeToHostElement(attribute: string, value: any): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, attribute, value);
    }
    /**@hidden */
    protected _setStyleToHostElement(attribute: string, value: any): void {
        this._renderer.setStyle(this._elementRef.nativeElement, attribute, value);
    }
}
