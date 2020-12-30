import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Compiler,
    Component,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    NgModuleFactory,
    OnChanges,
    Renderer2,
    SimpleChanges,
    Type,
    ViewChild
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { loadRemoteModule } from '../../api/plugins/federation-utils';
import {
    AngularIvyComponentDescriptor,
    DescriptorsModule,
    IframePageDescriptor,
    PluginDescriptor
} from '../../api/plugins/lookup/plugin-descriptor.model';
import { LookupService } from '../../api/plugins/lookup/lookup.service';
import { PluginManagerService } from '../../api/plugins/plugin-manager.service';

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
            (error)="onLoadIframeError()"
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

    @Output()
    error = new EventEmitter<Error>();

    @ViewChild('iframe', { static: false })
    iframeEl: ElementRef;

    _ngComponent: Type<any>;
    _ngModule: NgModuleFactory<any>;

    _safeIframeUri: SafeResourceUrl;

    private descriptor: Partial<PluginDescriptor>;

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _cd: ChangeDetectorRef,
        private readonly _render: Renderer2,
        private readonly pluginManagerService: PluginManagerService,
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

        const pluginModule = this.findPluginModule(descriptor) as DescriptorsModule;

        if (!pluginModule) {
            return;
        }

        const remoteModule = await this.loadRemoteModule(descriptor, pluginModule)
            .catch((error) => this.dispatchError(error));

        if (!remoteModule) {
            return;
        }

        const moduleOrCustomElementName = remoteModule[pluginModule.name];
        const isNotIframeType = pluginModule.type !== 'iframe' && !this.iframeUri;

        if (isNotIframeType) {
            this._safeIframeUri = null;
        }

        if (pluginModule.type === 'iframe') {
            return this.renderIframe(descriptor, pluginModule);
        }

        if (pluginModule.type === 'custom-element') {
            return this.renderCustomElement(moduleOrCustomElementName);
        }

        if (pluginModule.type === 'angular-ivy-component') {
            this.renderComponent(moduleOrCustomElementName, pluginModule, remoteModule);
        }

        this.pluginManagerService.register(descriptor);
    }

    async loadRemoteModule(descriptor: Partial<PluginDescriptor>, pluginModule: DescriptorsModule): Promise<DescriptorsModule> {
        return await loadRemoteModule<DescriptorsModule>(descriptor, pluginModule);
    }

    onLoadIframeError() {
        this.dispatchError(
            `PluginLauncherIframeLoadingError: Can't fetch resource from ${this.iframeUri}`
        );
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

    private findPluginModule(descriptor: Partial<PluginDescriptor>): void | DescriptorsModule {
        const pluginModule = descriptor.modules.find(module => module.name === this.module);

        // module plugin descriptor not found
        if (!pluginModule) {
            return this.dispatchError(
                `PluginLauncherDescriptorNotFoundError: Can't find plugin descriptor module with name ${this.module}`
            );
        }

        return pluginModule;
    }

    private renderIframe(descriptor: Partial<PluginDescriptor>, pluginModule: IframePageDescriptor): void {
        const url = descriptor.uri + pluginModule.html;
        this._safeIframeUri = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    private renderCustomElement(elementName: string): void {
        const element = document.createElement(elementName);
        const definedCustomElement = window.customElements.get(elementName);
        const isCustomElement = definedCustomElement && element instanceof definedCustomElement;

        // custom element is unknown in DOM
        if (!isCustomElement) {
            return this.dispatchError(
                `PluginLauncherCustomElementResolveError: An element with name ${elementName} is not registered`
            );
        }

        this._render.appendChild(this._elementRef.nativeElement, element);
    }

    private async renderComponent(module: any, pluginModule: AngularIvyComponentDescriptor, remoteModule: DescriptorsModule): Promise<void> {
        const pluginModuleName = pluginModule.name;
        let pluginComponentName = pluginModule.component;

        // if provided module name and component name we bootstrap both
        if (pluginModuleName && pluginComponentName) {
            this._ngModule = await this.compiler.compileModuleAsync(module);
            this._ngComponent = remoteModule[pluginComponentName];
        }

        // if component name is not provided, we suppose that `name` is a component name
        if (!pluginComponentName) {
            pluginComponentName = pluginModuleName;
            this._ngModule = void 0;
            this._ngComponent = remoteModule[pluginComponentName];
        }

        // check if component is an object
        const isComponentDefined = Object.prototype.toString.call(this._ngComponent) === '[object Object]';

        if (!isComponentDefined) {
            return this.dispatchError(
                `PluginLauncherComponentResolveError: Can't resolve a component with name ${pluginComponentName}`
            );
        }

        this._cd.detectChanges();
    }

    private dispatchError(error: string | Error) {
        const message = typeof error === 'string'
            ? new Error(error)
            : error;

        this.error.emit(message);
    }
}
