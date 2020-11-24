import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Compiler,
    Component,
    ComponentFactoryResolver,
    ElementRef,
    Injector,
    Input,
    NgModuleFactory,
    OnChanges,
    Renderer2,
    SimpleChanges,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { loadRemoteModule } from '../../api/plugins/federation-utils';
import {
    AngularIvyComponentDescriptor,
    DescriptorsModule,
    PluginDescriptor
} from '../../api/plugins/lookup/plugin-descriptor.model';
import { LookupService } from '../../api/plugins/lookup/lookup.service';
import { PluginManagerService } from '../../api/plugins/plugin-manager.service';
import { PluginLauncherModule } from './plugin-launcher.module';

@Component({
    selector: 'fds-plugin-launcher',
    styleUrls: ['./plugin-launcher.component.scss'],
    template: `
        <ng-container *ngComponentOutlet="_ngComponent; ngModuleFactory: _ngModule"></ng-container>
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

    @ViewChild('iframe', { static: false })
    iframeEl: ElementRef;

    _ngComponent: Type<any>;
    _ngModule: NgModuleFactory<any>;

    _safeIframeUri: SafeResourceUrl;
    private descriptor: Partial<PluginDescriptor>;

    constructor(private readonly _injector: Injector,
                private readonly _elementRef: ElementRef,
                private readonly cfr: ComponentFactoryResolver,
                private readonly _cd: ChangeDetectorRef,
                private readonly _render: Renderer2,
                private readonly _pluginMgr: PluginManagerService,
                private readonly lookupService: LookupService,
                private readonly sanitizer: DomSanitizer,
                private readonly compiler: Compiler) {
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

        const _pluginModule = descriptor.modules.find(module => module.name === this.module);
        const _remoteModule = await loadRemoteModule<DescriptorsModule>(descriptor, _pluginModule)
            .catch(err => console.error(err));
        if (!_remoteModule) {
            return;
        }
        const _module = _remoteModule[_pluginModule.name];

        if (_pluginModule.type !== 'iframe' && !this.iframeUri) {
            this._safeIframeUri = null;
        }

        if (_pluginModule.type === 'iframe') {
            const _url = descriptor.uri + _pluginModule.html;
            this._safeIframeUri = this.sanitizer.bypassSecurityTrustResourceUrl(_url);
            return;
        }

        if (_pluginModule.type === 'custom-element') {
            const element = document.createElement(_module);
            this._render.appendChild(this._elementRef.nativeElement, element);
            return;
        }

        if (_pluginModule.type === 'angular-ivy-component') {
            const ngPluginModule = _pluginModule as AngularIvyComponentDescriptor;
            // if provided module name and component name we bootstrap both
            if (ngPluginModule.name && ngPluginModule.component) {
                this._ngModule = await this.compiler.compileModuleAsync(_module);
                this._ngComponent = _remoteModule[ngPluginModule.component];
            }
            // if component name is not provided, we suppose that `name` is a component name
            if (!ngPluginModule.component) {
                this._ngModule = void 0;
                this._ngComponent = _remoteModule[ngPluginModule.name];
            }

            this._cd.detectChanges();
        }
        this._pluginMgr.register(descriptor);
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
