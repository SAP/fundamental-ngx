import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from '../../api/extensions/lookup/lookup.service';
import { PluginDescriptor } from '../../api/extensions/lookup/plugin-descriptor.model';


@Component({
    template: `
        <fds-plugin-launcher [descriptor]="_pluginDescriptor"></fds-plugin-launcher>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginPageLauncherComponent implements OnInit {
    _pluginDescriptor: Partial<PluginDescriptor>;

    constructor(private _cd: ChangeDetectorRef,
                private route: ActivatedRoute,
                private lookupService: LookupService) {
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.subscribe(
            params => {
                const id = params.get('remote-route');
                const plugin = this.lookupService.lookup(this.initQuery(id));
                if (!plugin) {
                    // Inject Router and havigate to NotFound page
                    this._pluginDescriptor = null;
                    return;
                }
                // init
                this._pluginDescriptor = plugin.descriptor;
                this._cd.detectChanges();
            });

    }


    private initQuery(route: string): Map<string, any> {
        const query = new Map();
        query.set('route', route);
        return query;
    }
}
