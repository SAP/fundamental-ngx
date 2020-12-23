import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { DynamicPageBackgroundType, CLASS_NAME, DynamicPageResponsiveSize } from '../constants';
import { addClassNameToElement } from '../utils';

/** Dynamic Page tab change event */
export class DynamicPageTabChangeEvent {
    constructor(public source: DynamicPageContentComponent, public payload: number) {}
}
@Component({
    selector: 'fdp-dynamic-page-content',
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
     * sets background for content to `list`, `transparent`, or `solid` background color.
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

    @Output()
    tabChange: EventEmitter<DynamicPageTabChangeEvent> = new EventEmitter<DynamicPageTabChangeEvent>();

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

    /** @hidden */
    constructor(public _elementRef: ElementRef<HTMLElement>, public _renderer: Renderer2) {}

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
