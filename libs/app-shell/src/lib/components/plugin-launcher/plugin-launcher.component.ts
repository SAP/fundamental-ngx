import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Injector,
    Input,
    OnChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { loadRemoteModule } from '../../api/extensions/federation-utils';
import {
    PluginDescriptor,
    Scope
} from '../../api/extensions/lookup/plugin-descriptor.model';
import { LookupService } from '../../api/extensions/lookup/lookup.service';
import { isPluginComponent } from '../../api/extensions/component/plugin-component';
import { PluginManagerService } from '../../api/extensions/plugin-manager.service';


@Component({
    selector: 'fds-plugin-laucher',
    template: '<ng-container #view></ng-container>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginLauncherComponent implements OnChanges {
    @Input()
    type: Scope = Scope.Page;

    @Input()
    name: string;

    @Input()
    category: string;

    @Input()
    provider: string;

    @Input()
    descriptor: Partial<PluginDescriptor>;

    @ViewChild('view', { read: ViewContainerRef, static: true })
    viewContainer: ViewContainerRef;


    constructor(private injector: Injector, private cfr: ComponentFactoryResolver,
                private _cd: ChangeDetectorRef,
                private _pluginMgr: PluginManagerService,
                private lookupService: LookupService) {
    }

    async ngOnChanges(): Promise<void> {
        this.viewContainer.clear();

        if (!this.descriptor) {
            const item = this.lookupService.lookup(this.initQuery());
            if (!item) {
                return;
            }
            this.descriptor = item.descriptor;
        }
        this.doCreateComponent(this.descriptor);
    }


    async doCreateComponent(descriptor: Partial<PluginDescriptor>): Promise<void> {
        const component = await loadRemoteModule(descriptor)
            .then(m => m[descriptor.componentName]);
        const factory = this.cfr.resolveComponentFactory(component);


        const componentRef: ComponentRef<any> = this.viewContainer.createComponent(factory, null, this.injector);

        if (isPluginComponent(componentRef.instance)) {
            this._pluginMgr.register(descriptor, componentRef.instance);
        }
        this._cd.detectChanges();
    }

    private initQuery(): Map<string, any> {
        const query = new Map();
        if (this.provider) {
            query.set('provider', this.provider);
        }
        if (this.category) {
            query.set('category', this.category);
        }

        if (this.name) {
            query.set('name', this.name);
        }
        return query;
    }
}
