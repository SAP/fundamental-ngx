import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Injector,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { loadRemoteModule } from '../../api/extensions/federation-utils';
import {
    PluginDescriptor,
    Scope
} from '../../api/extensions/lookup/plugin-descriptor.model';
import { LookupService } from '../../api/extensions/lookup/lookup.service';


/**
 * FDS stands for fundamental-shell
 */
@Component({
    selector: 'fds-plugin-laucher',
    template: '<ng-container #view></ng-container>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginLauncherComponent implements OnInit {
    @ViewChild('view', { read: ViewContainerRef, static: true })
    viewContainer: ViewContainerRef;

    @Input()
    id: string;

    @Input()
    type: Scope = Scope.Page;

    @Input()
    name: string;

    @Input()
    category: string;

    @Input()
    provider: string = 'Ariba';

    constructor(private injector: Injector, private cfr: ComponentFactoryResolver,
                private _cd: ChangeDetectorRef,
                private lookupService: LookupService) {
    }

    async ngOnInit(): Promise<void> {
        const item = this.lookupService.lookup(this.initQuery());
        this.doCreateComponent(item.descriptor);
        this._cd.markForCheck();

    }


    async doCreateComponent(plugin: Partial<PluginDescriptor>): Promise<void> {
        const component = await loadRemoteModule(plugin)
            .then(m => m[plugin.componentName]);
        console.log(component);
        const factory = this.cfr.resolveComponentFactory(component);

        this.viewContainer.createComponent(factory, null, this.injector);
    }

    private initQuery(): Map<string, any> {
        const query = new Map();
        if (this.provider) {
            query.set('provider', this.provider);
        }
        if (this.category) {
            query.set('category', this.category);
        }

        if (this.id) {
            query.set('id', this.id);
        }
        return query;
    }
}
