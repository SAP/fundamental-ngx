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

        const pluginModule = this.findPluginModule(descriptor);
        const remoteModule = await loadRemoteModule<DescriptorsModule>(descriptor, pluginModule)
            .catch((error) => {
                this.dispatchError(error);
            });

        if (!remoteModule) {
            return;
        }

        const moduleOrCustomElementName = remoteModule[pluginModule.name];
        const isNotIframeType = pluginModule.type !== 'iframe' && !this.iframeUri;

        if (isNotIframeType) {
            this._safeIframeUri = null;
        }

        switch (pluginModule.type) {
            case 'iframe':
                this.renderIframe(descriptor, pluginModule);
                return;

            case 'custom-element':
                this.renderCustomElement(moduleOrCustomElementName);
                return;

            case 'angular-ivy-component':
                this.renderComponent(moduleOrCustomElementName, pluginModule, remoteModule);
                break;
        }

        this.pluginManagerService.register(descriptor);
    }

    onLoadIframeError() {
        this.dispatchError(
            new Error(
                `PluginLauncherIframeLoadingError: Can't fetch resource from ${this.iframeUri}`
            )
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

    private findPluginModule(descriptor: Partial<PluginDescriptor>): DescriptorsModule {
        const pluginModule = descriptor.modules.find(module => module.name === this.module);

        // module plugin descriptor not found
        if (!pluginModule) {
            this.dispatchError(
                new Error(
                    `PluginLauncherDescriptorNotFoundError: Can't find plugin descriptor module with name ${this.module}`
                )
            );
            return;
        }

        return pluginModule;
    }

    private renderIframe(descriptor: Partial<PluginDescriptor>, pluginModule: IframePageDescriptor) {
        const url = descriptor.uri + pluginModule.html;
        this._safeIframeUri = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    private renderCustomElement(elementName: string) {
        const element = document.createElement(elementName);
        const isCustomElement = element instanceof window.customElements.get(elementName);

        // custom element is unknown in DOM
        if (!isCustomElement) {
            this.dispatchError(
                new Error(
                    `PluginLauncherCustomElementResolveError: An element with name ${elementName} is not registered`
                )
            );
            return;
        }

        this._render.appendChild(this._elementRef.nativeElement, element);
    }

    private async renderComponent(module: any, pluginModule: AngularIvyComponentDescriptor, remoteModule: DescriptorsModule) {
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
            this.dispatchError(
                new Error(
                    `PluginLauncherComponentResolveError: Can't resolve a component with name ${pluginComponentName}`
                )
            );
        }

        this._cd.detectChanges();
    }

    private dispatchError(error: Error) {
        this.error.emit(error);
    }
}
