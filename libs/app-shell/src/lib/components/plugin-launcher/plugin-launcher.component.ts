import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    Injector,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { LookupService } from '../../api/extensions/lookup.service';
import {
    PluginDescriptor,
    Scope
} from '../../api/extensions/plugin-definition.model';
import { loadRemoteModule } from '../../api/extensions/federation-utils';


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
    type: Scope = Scope.Page;

    @Input()
    name: string;

    @Input()
    category: string;

    @Input()
    provider: string;

    constructor(private injector: Injector, private cfr: ComponentFactoryResolver,
                private lookupService: LookupService) {
    }

    async ngOnInit(): Promise<void> {
        const query = new Map().set('type', this.type).set('name', this.name).set('category', this.category)
            .set('provider', this.provider);

        this.lookupService.lookup(query).subscribe((items) => {
            if (items.length > 1) {
                throw new Error('Found more plugins registered under the same name');
            }
            this.doCreateComponent(items[0].descriptor);
        });

    }


    async doCreateComponent(plugin: PluginDescriptor): Promise<void> {
        const component = await loadRemoteModule(plugin)
            .then(m => m[plugin.componentName]);

        const factory = this.cfr.resolveComponentFactory(component);

        this.viewContainer.createComponent(factory, null, this.injector);
    }

}
