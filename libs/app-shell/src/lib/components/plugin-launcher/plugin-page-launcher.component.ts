import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import { LookupService } from '../../api/extensions/lookup/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { PluginDescriptor } from '../../api/extensions/lookup/plugin-descriptor.model';


/**
 * FDS stands for fundamental-shell
 */
@Component({
    template: `
        <fds-plugin-laucher [descriptor]="_pluginDescriptor"></fds-plugin-laucher>
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
        query.set('remoteRoute', route);
        return query;
    }
}
