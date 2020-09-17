import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    ContentChild
} from '@angular/core';
import { BACKGROUND_TYPE, CLASS_NAME, DYNAMIC_PAGE_CHILD_TOKEN, RESPONSIVE_SIZE } from '../constants';
import { DynamicPageService } from '../dynamic-page.service';
import { TabPanelComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-dynamic-page-content',
    templateUrl: './dynamic-page-content.component.html',
    styleUrls: ['./dynamic-page-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_PAGE_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicPageContentComponent)
        }
    ]
})
export class DynamicPageContentComponent extends CdkScrollable implements OnInit, AfterViewInit, OnDestroy {
    @Input()
    tabLabel: string;
    // set tabLabel(label: string) {
    //     if (label) {
    //         this._label = label;
    //     }
    // }

    // get tabLabel(): string {
    //     return this._label;
    // }

    @Input()
    activeTab = 0;

    private _label: string;
    @ViewChild(CdkScrollable)
    cdkScrollable: CdkScrollable;

    toggledVal = false;

    @ViewChild('dynPage')
    dynPage: ElementRef;
    isVisible = true;

    /** @hidden */
    // @ViewChild('tabbed')
    // contentTemplateRef: TemplateRef<any>;
    /** @hidden */
    // @ViewChild('contentTpl')
    // contentTemplate: TemplateRef<any>;

    // @ViewChild('contentTemplate')
    // contentTemplate: TemplateRef<any>;

    @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild(TabPanelComponent)
    content: TabPanelComponent;

    tab: TabPanelComponent;

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
        // this._setAttributeToHostElement('cdkScrollable', '');
        // this.scrollDispatcher.register(this.scrollable);
        // this._dynamicPageService.$toggle.subscribe((val) => {
        //     console.log('subscriibied to dyn page serviicee in content' + val);
        //     this.toggledVal = val;
        // });
        // this.scrollDispatcher.scrolled().subscribe((cdk: CdkScrollable) => {
        //     this.zone.run(() => {
        //         // Your update here!
        //         console.log('scrolled from ' + cdk.getElementRef().nativeElement.innerHTML);
        //         // improperly used, currently detecting doc scroll.
        //         // this._dynamicPageService.toggleHeader(!this.toggledVal);
        //     });
        // });
    }

    ngOnInit(): void {
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPageContent);
        if (this.background) {
            this._setBackgroundStyles(this.background);
        }
        if (this.size) {
            this._setSize(this.size);
        }
        // if (this.tabLabel) {
        // add tabbed content
        // todo add to the fd-tab class properly
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPageTabs);
        // this._removeClassNameToHostElement(CLASS_NAME.dynamicPageContent);
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPageTabsExtraLarge);
        // this._removeClassNameToHostElement(CLASS_NAME.dynamicPageContentExtraLarge);

        // this._setStyleToHostElement('overflow', 'scroll');
        // }
    }

    // ngAfterViewInit(): void{
    //     this.content.expanded =
    // }

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
    ngAfterViewInit(): void {
        // this.scrollDispatcher.register(this.cdkScrollable);
        // console.log('has?' + this.scrollDispatcher.scrollContainers.has(this.cdkScrollable));
        // this.scrollDispatcher.scrolled(100).subscribe((cdk: CdkScrollable) => {
        //     this.zone.run(() => {
        //         // Your update here!
        //         console.log('scrolled' + cdk);
        //         // improperly used, currently detecting doc scroll.
        //         const scrollPosition = cdk.getElementRef().nativeElement.scrollTop;
        //         console.log(scrollPosition);
        //         this._dynamicPageService.toggleHeader(!this.toggledVal);
        //     });
        // });
        // this.scrollDispatcher.
        // this.scrollDispatcher.scrolled().subscribe((cdk: CdkScrollable) => {
        //     this.zone.run(() => {
        //         // Your update here!
        //         console.log('scrolled');
        //     });
        // });
        // this.scrollable.elementScrolled().subscribe((scrolled) => console.log('scrolled', scrolled));
        // this.scrollable.elementScrolled().subscribe((scrolled) => {
        //     this.zone.run(() => {
        //         // Your update here!
        //         console.log('scrolled');
        //         // improperly used, currently detecting doc scroll.
        //     });
        // });
        console.log('in after viieiw');
        // const scroll$ = fromEvent(window, 'scroll').pipe(
        //     throttleTime(10),
        //     map(() => window.pageYOffset),
        //     pairwise(),
        //     map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
        //     distinctUntilChanged(),
        //     share()
        // );

        // const scrollUp$ = scroll$.pipe(filter((direction) => direction === Direction.Up));

        // const scrollDown = scroll$.pipe(filter((direction) => direction === Direction.Down));

        // scrollUp$.subscribe(() => {
        //     console.log('UPPPP');
        //     this.isVisible = true;
        //     this._dynamicPageService.toggleHeader(!this.toggledVal);
        // });
        // scrollDown.subscribe(() => (this.isVisible = false));

        // this works in parent scroll
        // this.zone.run(() => {
        //     const content = document.querySelector('.fd-dynamic-page__content');

        //     const scroll$ = fromEvent(content, 'scroll').pipe(
        //         throttleTime(10),
        //         map(() => content.scrollTop),
        //         pairwise(),
        //         map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
        //         distinctUntilChanged(),
        //         share()
        //     );
        //     const scrollUp$ = scroll$.pipe(filter((direction) => direction === Direction.Up));
        //     const scrollDown$ = scroll$.pipe(filter((direction) => direction === Direction.Down));
        //     scrollUp$.subscribe(() => {
        //         console.log('UPPPP');
        //         this.isVisible = true;
        //         this._dynamicPageService.toggleHeader(!this.toggledVal);
        //     });
        //     scrollDown$.subscribe(() => (this.isVisible = false));
        //     console.log(scroll$);
        // });
    }
    // @HostBinding('@toggle')
    // get toggle(): VisibilityState {
    //     return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
    // }

    // @HostListener('scroll', ['$event'])
    // onElementScroll($event): void {
    //     console.log('scrollinig');
    // }

    ngOnDestroy(): void {
        this.scrollDispatcher.deregister(this.cdkScrollable);
    }
    /**@hidden */
    protected _addClassNameToHostElement(element: Element, className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
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
