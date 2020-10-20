import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    Injector,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { loadRemoteModule } from '../../api/extensions/federation-utils';
import { AngularIvyComponentDescriptor, PluginDescriptor } from '../../api/extensions/lookup/plugin-descriptor.model';
import { LookupService } from '../../api/extensions/lookup/lookup.service';
import { PluginManagerService } from '../../api/extensions/plugin-manager.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isPluginComponent } from '../../api/extensions/component/plugin-component';

@Component({
    selector: 'fds-plugin-launcher',
    styleUrls: ['./plugin-launcher.component.scss'],
    template: `
        <ng-container #view></ng-container>
        <iframe
            *ngIf="_safeIframeUri"
            #iframe
            class="responsive-wrapper"
            [src]="_safeIframeUri"
            [style.minHeight]="iframeAttrs.height"
        ></iframe>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginLauncherComponent implements OnChanges, AfterViewChecked {
    /** plugin name */
    @Input()
    name: string;

    /** module name */
    @Input()
    module: string;

    /** Iframe URI */
    @Input()
    iframeUri: string;
    @Input()
    iframeAttrs: Record<string, string | number>;

    @ViewChild('view', { read: ViewContainerRef, static: true })
    ngContentView: ViewContainerRef;

    @ViewChild('iframe', { static: false })
    iframeEl: ElementRef;

    _safeIframeUri: SafeResourceUrl;
    private descriptor: Partial<PluginDescriptor>;

    constructor(private readonly _injector: Injector,
                private readonly _elementRef: ElementRef,
                private readonly cfr: ComponentFactoryResolver,
                private readonly _cd: ChangeDetectorRef,
                private readonly _render: Renderer2,
                private readonly _pluginMgr: PluginManagerService,
                private readonly lookupService: LookupService,
                private readonly sanitizer: DomSanitizer) {
    }

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if ('iframeUri' in changes) {
            this._safeIframeUri = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUri);
        }

        if ('name' in changes) {
            const { descriptor } = this.lookupService.lookup(new Map([['name', this.name]]));
            if (!this.descriptor || this.descriptor.name !== descriptor.name) {
                this.descriptor = descriptor;
                this.renderPlugin(this.descriptor);
            }
        }
    }

    ngAfterViewChecked(): void {
        if (this._safeIframeUri) {
            this.updateAttrs(this.iframeAttrs);
        }
    }

    async renderPlugin(descriptor: Partial<PluginDescriptor>): Promise<void> {
        if (!descriptor) {
            return;
        }

        const _module = descriptor.modules.find(module => module.name === this.module);
        const _component = await loadRemoteModule<AngularIvyComponentDescriptor>(descriptor, _module as AngularIvyComponentDescriptor)
            .then(m => m[_module.name])
            .catch(err => console.error(err));

        if (_module.type !== 'iframe' && !this.iframeUri) {
            this._safeIframeUri = null;
        }

        if (_module.type === 'iframe') {
            const _url = descriptor.uri + _module.html;
            this._safeIframeUri = this.sanitizer.bypassSecurityTrustResourceUrl(_url);
            return;
        }

        if (_module.type === 'custom-element') {
            const element = document.createElement(_component);
            this._render.appendChild(this._elementRef.nativeElement, element);
            return;
        }

        if (_module.type === 'angular-ivy-component' && this.ngContentView) {
            this.ngContentView.clear();
            const factory = this.cfr.resolveComponentFactory(_component);
            const componentRef: ComponentRef<any>  = this.ngContentView
                .createComponent(factory, null, this._injector);

            if (isPluginComponent(componentRef.instance)) {
                this._pluginMgr.register(descriptor, componentRef.instance);
            }
            this._cd.detectChanges();
        }
    }

    private updateAttrs(newValue: Record<string, string | number>, oldValue?: Record<string, string>): void {
        if (!this._safeIframeUri) {
            return;
        }
        if (oldValue) {
            for (const key of Object.keys(oldValue)) {
                this._render.removeAttribute(this.iframeEl.nativeElement, key);
            }
        }
        if (newValue) {
            for (const key of Object.keys(newValue)) {
                this._render.setAttribute(this.iframeEl.nativeElement, key, `${newValue[key]}`);
            }
        }
    }
}
