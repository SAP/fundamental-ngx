import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, ElementRef, Renderer2, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'fdp-microfrontends-wrapper',
    template: `
         <div #customElementDiv>
            <router-outlet *ngIf="routeOutlet"></router-outlet>
        </div>
  `
})

export class MicroFrontendsWrapperComponent implements OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('customElementDiv', { static: false }) private elementDiv: ElementRef;
    @Output() oncustomevent = new EventEmitter();
    @Input() elParameters: any[];
    @Input() customTag: string;
    @Input() src: any;
    @Input() stylesheet: any;
    @Input() routeOutlet: boolean = true;
    @Input() routeRoot: string;

    customEle;
    customEventHandler;
    elementInputs = {};
    routeSubscribe: any;

    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private customElementRenderer: Renderer2, ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.customEle) {
            this.appendElement();
        }
    }

    public setParameters(params) {
        this.elParameters = params;
        if (this.customEle) {
            (this.elParameters || []).forEach((p) => {
                if (p.value && p.value.startsWith('${') && p.value.endsWith('}')) {
                    const vKey = p.value.substring(2, p.value.length - 1);
                    const value = this.elementInputs[vKey];
                    this.customEle.setAttribute(p.key, value);
                } else {
                    this.customEle.setAttribute(p.key, p.value);
                }
            });
        }
    }

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

    appendCssLink(shadowroot) {
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

    installJsLink(shadowRoot) {

        const microapp_store = document.head.getElementsByTagName('script');
        let loaded: boolean = false;
        let srcs: String[];

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

    appendJsLink(srcs) {
        (srcs || []).forEach(src => {
            const script = this.customElementRenderer.createElement('script');
            script.src = src;
            document.head.appendChild(script);
            script.onerror = () => console.error(`error loading ${src}`);
        });
    }

    appendElement() {

        const content = this.elementDiv.nativeElement;
        if (!content.shadowRoot) {
            const shadowroot = content.attachShadow({ mode: 'open' });
            this.appendCssLink(shadowroot);
            this.installJsLink(shadowroot);
            this.customEle = this.customElementRenderer.createElement(this.customTag);
            this.customEventHandler = this.installCustomEvenetHandler();
            this.customEle.addEventListener('oncustomevent', this.customEventHandler);
            shadowroot.appendChild(this.customEle);
        }

        this.setParameters(this.elParameters);

    }

    installCustomEvenetHandler() {
        const eventHandler = this.oncustomevent.emit;
        const eventscope = this.oncustomevent;
        return function (e) {
            eventHandler.apply(eventscope, [e.detail])
        }
    }

}
