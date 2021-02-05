import { FocusMonitor } from '@angular/cdk/a11y';

import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ContentChild,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { CLASS_NAME, DynamicPageResponsiveSize } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
import { addClassNameToElement } from '../../utils';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import { DynamicPageLayoutActionsComponent } from '../../public_api';
import { DynamicPageGlobalActionsComponent } from '../../public_api';
import { DynamicPageTitleContentComponent } from '../actions/dynamic-page-title-content.component';

@Component({
    selector: 'fd-dynamic-page-header',
    templateUrl: './dynamic-page-header.component.html',
    styleUrls: ['./dynamic-page-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.tabindex]': '0'
    }
})
export class DynamicPageHeaderComponent implements OnInit, AfterViewInit {

    /**  */
    @Input()
    title: string;

    @Input()
    subtitle: string;

    @Input()
    keyInfo: string;

    /** @hidden */
    @ContentChild(BreadcrumbComponent)
    _breadcrumbComponent: BreadcrumbComponent;

    /** @hidden */
    @ContentChild(DynamicPageGlobalActionsComponent)
    _globalActions: DynamicPageGlobalActionsComponent;

    /** @hidden */
    @ContentChild(DynamicPageTitleContentComponent)
    _contentToolbar: DynamicPageTitleContentComponent;

    /** @hidden */
    @ContentChild(DynamicPageLayoutActionsComponent)
    _layoutActions: DynamicPageLayoutActionsComponent;

    /** @hidden */
    _actionsSquashed = false;

    /** @hidden */
    _size: DynamicPageResponsiveSize;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        private _focusMonitor: FocusMonitor,
        private _dynamicPageService: DynamicPageService,
        private _ngZone: NgZone,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageTitleArea);
        this._listenForFocusInToExpand();
        this._listenToPageChanges();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._addCustomClassToBreadcrumb();
    }

    /**
     * sets size which in turn adds corresponding padding for the size type.
     * size can be `small`, `medium`, `large`, or `extra-large`.
     */
    set size(sizeType: DynamicPageResponsiveSize) {
        this._setSize(sizeType);
        this._size = sizeType;
    }

    /**
     * get reference to this element
     */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    /** @hidden */
    stopPropagation(event: MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden */
    private _listenForFocusInToExpand(): void {
        this._focusMonitor.monitor(this._elementRef).subscribe((origin) =>
            this._ngZone.run(() => {
                if (origin === 'keyboard') {
                    this._dynamicPageService.collapsed.next(false);
                }
            })
        );
    }

    /**
     * @hidden
     * sets the padding classes
     * @param sizeType
     */
    private _setSize(sizeType: DynamicPageResponsiveSize): void {
        setTimeout(() => {
            this._breadcrumbComponent.onResize();
            this._globalActions.setSize(sizeType);
            this._contentToolbar.setSize(sizeType);
            this._changeDetRef.detectChanges();
        })
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassNameToCustomElement(element: Element, className: string): void {
        addClassNameToElement(this._renderer, element, className);
    }

    /** @hidden */
    private _addCustomClassToBreadcrumb(): void {
        if (this._breadcrumbComponent) {
            this._addClassNameToCustomElement(
                this._breadcrumbComponent.elementRef.nativeElement,
                CLASS_NAME.dynamicPageBreadcrumb
            );
        }
    }

    /** @hidden */
    private _listenToPageChanges(): void {
        this._dynamicPageService.pixelsSizeChanged.subscribe(pixels => {
            const actionsSquashed: boolean = pixels < 1280;
            if (actionsSquashed !== this._actionsSquashed) {
                this._actionsSquashed = actionsSquashed;
                this._changeDetRef.detectChanges();
            }
        });
    }
}
