import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';
import { ShellbarMenuItem } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

    items: ShellbarMenuItem[] = [
        {
            name: 'Core Docs',
            callback: () => { this.routerService.navigate(['core/home']) }
        },
        {
            name: 'Platform Docs',
            callback: () => { this.routerService.navigate(['platform/home']) }
        }
    ];


    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

    version: string = environment.version;

    public isOnCore: boolean = false;

    constructor (
        private routerService: Router,
        @Inject('CURRENT_LIB') private currentLib: Libraries,
    ) {
        this.isOnCore = this.currentLib === 'core';
    }
}
