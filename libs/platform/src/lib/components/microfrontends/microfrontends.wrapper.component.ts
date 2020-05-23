import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, Renderer2, ViewChild, Output, EventEmitter, Input, Optional } from '@angular/core';
import { OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
    selector: 'fdp-microfrontends-wrapper',
    template: `
         <div #customElementDiv>
            <router-outlet *ngIf="routeOutlet"></router-outlet>
        </div>
  `
})

export class MicroFrontendsWrapperComponent implements OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('customElementDiv', { static: false }) 
    private elementDiv: ElementRef;
    
    /** emit custom element event to main app*/
    @Output() 
    oncustomevent = new EventEmitter();
    /** 
     * micro app input parameters, it's array of object
     *  object key will set to custom element's attrubite
     *  object value will set to custom element's attribute vaue
     */
    @Input() elParameters: Array<{key: string, value: any}>;
    /**
     * custom element tag name
     */
    @Input() customTag: string;
    /**
     * custom element code href, can be array of string or string
     */
    @Input() src: string[]|string;
    /**
     * custom element css href, can be array of string or string
     */
    @Input() stylesheet: string[]|string;
    /**
     * true : if the wrapper install as route node
     * false: if the wrapper is not used as route node
     */
    @Input() routeOutlet: boolean = true;
    /**
     * main app's router path from where micro app start it's own route
     * for example if this wrapper is on route path platform/microfrontends/example in 
     * main app, set routeRoot 'platform/microfrontends/example', 
     * micro app will start path with  platform/microfrontends/example and continue add
     * child path in their own route configuration
     */
    @Input() routeRoot: string;

    private customEle: any;
    private customEventHandler: (event: object) => object;
    private routeSubscribe: Subscription;

    constructor(
        @Optional() private route: ActivatedRoute,
        private customElementRenderer: Renderer2 ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.customEle) {
            this.appendElement();
        }
    }

    /**
     * set micro app custom element's attribute
     * @param params array of object 
     */
    
     public setParameters(attrs: Array<{key: string, value: any}>) {
        this.elParameters = attrs;
        if (this.customEle) {
            (this.elParameters || []).forEach((p) => {
               
                this.customEle.setAttribute(p.key, p.value);
                
            });
        }
    }

    /**
     * if this component is used as route node component
     * the all input parameter will be from route configuration 
     */
     ngAfterViewInit() {
        if (this.routeOutlet) {
            this.routeSubscribe = this.route.data.subscribe(params => {
                this.src = params.src;
                this.stylesheet = params.stylesheet;
                this.customTag = params.customTag;
                this.elParameters = params.elParameters;
                this.appendElement();
            });
        } else {
            this.appendElement();
        }
    }


    ngOnDestroy() {
        if (this.routeSubscribe) {
            this.routeSubscribe.unsubscribe();
        }
        if (this.customEle && this.customEventHandler) {
            this.customEle.removeEventListener('oncustomevent', this.customEventHandler);
        }
    }

    private appendCssLink(shadowroot: object): void {
        let stylesheets: String[];

        if (!Array.isArray(this.stylesheet)) {
            stylesheets = [this.stylesheet];
        } else {
            stylesheets = this.stylesheet as string[];
        }

        stylesheets.forEach(stylesheet => {
            const cssLink = document.createElement('div');
            cssLink.setAttribute('css_href', stylesheet as string);
            cssLink.style.display = 'none';
            cssLink.className = '__micro_app_css_href__';
            this.customElementRenderer.appendChild(shadowroot, cssLink);
        });
        const loc = this.routeRoot;
        if (loc) {
            const locationLink = document.createElement('div');
            locationLink.setAttribute('root_path', loc);
            locationLink.style.display = 'none';
            locationLink.className = '__micro_app_router_root__';
            this.customElementRenderer.appendChild(shadowroot, locationLink);
        }
    }

    private installJsLink(): void {

        const microapp_store = document.head.getElementsByTagName('script');
        let loaded: boolean = false;
        let srcs: string[];

        if (!Array.isArray(this.src)) {
            srcs = [this.src];
        } else {
            srcs = this.src as string[];
        }

        for (let i = 0; microapp_store && i < microapp_store.length; i++) {
            if (srcs.includes(microapp_store[i].getAttribute('src'))) {
                loaded = true;
                break;
            }
        }

        if (!loaded) {
            this.appendJsLink(srcs);
        }
    }

    private appendJsLink(srcs: string[]): void {
        (srcs || []).forEach(src => {
            const script = this.customElementRenderer.createElement('script');
            script.src = src;
            document.head.appendChild(script);
            script.onerror = () => console.error(`error loading ${src}`);
        });
    }

    private appendElement(): void {

        const content = this.elementDiv.nativeElement;
        if (!content.shadowRoot) {
            const shadowroot = content.attachShadow({ mode: 'open' });
            this.appendCssLink(shadowroot);
            this.installJsLink();
            this.customEle = this.customElementRenderer.createElement(this.customTag);
            this.customEventHandler = this.installCustomEvenetHandler();
            this.customEle.addEventListener('oncustomevent', this.customEventHandler);
            shadowroot.appendChild(this.customEle);
        }

        this.setParameters(this.elParameters);

    }

    private installCustomEvenetHandler(): (result: any) => any {
        const eventHandler = this.oncustomevent.emit;
        const eventscope = this.oncustomevent;
        return function (e) {
            eventHandler.apply(eventscope, [e.detail])
        }
    }

}
