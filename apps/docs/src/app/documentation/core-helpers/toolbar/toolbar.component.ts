import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';
import { ShellbarMenuItem, ProductSwitchItem, ShellbarUser } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {


    version: string = environment.version;
    public isOnCore: boolean = false;


    productSwitcher: ProductSwitchItem[] = [
        {
            title: 'Core',
            icon: 'home',
            selected: true,
            callback: this.productSwitcherCallback
        },
        {
            title: 'Platform',
            icon: 'business-objects-experience',
            callback: this.productSwitcherCallback
        }
    ];

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

    productMenuItems: ShellbarMenuItem[] = [
        { name: this.version, callback: () => { window.location.href = 'https://sap.github.io/fundamental-ngx/#/core/home'; } },
        { name: 'v0.12.0', callback: () => { window.location.href = 'fundamental-ngx#/core/alert#alert-types'; } },
        { name: 'prerelease', callback: () => { window.location.href = 'https://fundamental-ngx.netlify.com/#/core/home'; } },
    ];

    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

    productSwitcherCallback($event) {
        console.log($event);
    }

    constructor(
        private routerService: Router,
        @Inject('CURRENT_LIB') private currentLib: Libraries,
    ) {
        this.isOnCore = this.currentLib === 'core';
    }
}
