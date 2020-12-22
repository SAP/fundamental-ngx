import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from '../../api/plugins/lookup/lookup.service';


@Component({
    template: `
        <fds-plugin-launcher [name]="_plugin"
                             [module]="_module"
                             (error)="dispatchError($event)">
        </fds-plugin-launcher>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PluginPageLauncherComponent implements OnInit {
    @Output()
    error = new EventEmitter<Error>();

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
                    return this.dispatchError(
                        new Error(
                            `PluginPageLauncherRoutingModuleNotFoundError: Can't find routing module with id ${id}`
                        )
                    );
                }
                // init
                this._plugin = lookupItem.id;
                this._module = lookupItem.module.name;
                this._cd.detectChanges();
            });

    }

    dispatchError(error: Error) {
        this.error.emit(error);
    }

    private initQuery(route: string): Map<string, any> {
        const query = new Map();
        query.set('route', route);
        return query;
    }
}
