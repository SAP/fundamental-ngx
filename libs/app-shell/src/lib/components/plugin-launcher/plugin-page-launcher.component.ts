import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from '../../api/extensions/lookup/lookup.service';
import { DescriptorsModule, PluginDescriptor } from '../../api/extensions/lookup/plugin-descriptor.model';


@Component({
    template: `
        <fds-plugin-launcher [name]="_plugin" [module]="_module"></fds-plugin-launcher>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginPageLauncherComponent implements OnInit {
    _plugin: string;
    _module: string;

    constructor(private _cd: ChangeDetectorRef,
                private route: ActivatedRoute,
                private lookupService: LookupService) {
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(
            params => {
                const id = params.get('remote-route');
                const lookupItem = this.lookupService.lookup(this.initQuery(id), true);
                if (!lookupItem) {
                    // Inject Router and navigate to NotFound page
                    this._plugin = null;
                    return;
                }
                // init
                this._plugin = lookupItem.id;
                this._module = lookupItem.module.name;
                this._cd.detectChanges();
            });

    }


    private initQuery(route: string): Map<string, any> {
        const query = new Map();
        query.set('route', route);
        return query;
    }
}
