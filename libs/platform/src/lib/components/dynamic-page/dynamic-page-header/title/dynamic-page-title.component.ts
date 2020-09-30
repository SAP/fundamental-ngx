import { FocusMonitor } from '@angular/cdk/a11y';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    Renderer2,
    ViewEncapsulation,
    ContentChild,
    ViewChild
} from '@angular/core';
import { BACKGROUND_TYPE, CLASS_NAME, RESPONSIVE_SIZE } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
import { BreadcrumbComponent } from '@fundamental-ngx/core';
import { addClassNameToElement, removeClassNameFromElement } from '../../utils';

@Component({
    selector: 'fdp-dynamic-page-title',
    templateUrl: './dynamic-page-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageTitleComponent implements OnInit, AfterViewInit {
    /**
     * sets background for content to List, Transparent or Solid background color.
     * Default is `solid`.
     */
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

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
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

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        public focusMonitor: FocusMonitor,
        private _dynamicPageService: DynamicPageService,
        private _ngZone: NgZone
    ) {}

    @Input()
    title: string;

    @Input()
    subtitle: string;

    /**
     * tracking the background value
     */
    _background: BACKGROUND_TYPE;

    /**
     * tracks the size for responsive padding
     */
    _size: RESPONSIVE_SIZE;

    ngAfterViewInit(): void {
        this.focusMonitor.monitor(this._elementRef).subscribe((origin) =>
            this._ngZone.run(() => {
                console.log('origin iis ' + origin);
                if (origin === 'keyboard') {
                    this._dynamicPageService.expandHeader();
                }
            })
        );

        const breadcrumb = this._elementRef.nativeElement.querySelector('fd-breadcrumb');
        if (breadcrumb) {
            this._addClassNameToCustomElement(breadcrumb, CLASS_NAME.dynamicPageBreadcrumb);
        }
    }

    getLabel?(): string {
        throw new Error('Method not implemented.');
    }

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleArea); // not getting this to work right
        this._setAttributeToHostElement('tabindex', 0);

        if (this.background) {
            this._setBackgroundStyles(this.background);
        }

        if (this.size) {
            this._setSize(this.size);
        }
    }

    _setBackgroundStyles(background: BACKGROUND_TYPE): any {
        switch (background) {
            case 'transparent':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaTransparentBg);
                break;
            case 'list':
            case 'solid':
            default:
                removeClassNameFromElement(
                    this._renderer,
                    this._elementRef.nativeElement,
                    CLASS_NAME.dynamicPageTitleAreaTransparentBg
                );
                break;
        }
    }

    _setSize(sizeType: RESPONSIVE_SIZE): any {
        switch (sizeType) {
            case 'small':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaSmall);
                break;
            case 'medium':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaMedium);
                break;
            case 'large':
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaLarge);
                break;
            case 'extra-large':
            default:
                this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleAreaExtraLarge);
                break;
        }
    }

    /**@hidden */
    private _setAttributeToHostElement(attribute: string, value: any): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, attribute, value);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }
}
