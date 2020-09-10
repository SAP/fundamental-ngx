import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrListComponent } from './pr-list.component';
import { TableModule } from '@fundamental-ngx/core';
import { PrListRoutingModule } from './pr-list-routing.module';
import {
    Listener,
    Message,
    Permission,
    PluginComponent,
    PluginConfiguration,
    PluginContext,
    PluginManagerService
} from '@fundamental-ngx/app-shell';

@NgModule({
    imports: [CommonModule, TableModule, PrListRoutingModule],
    declarations: [PrListComponent],
    exports: [PrListComponent]
})
export class PrListModule implements PluginComponent {

    constructor(private pluginMgr: PluginManagerService) {
        pluginMgr.register(this, { id: 'PrList' });
    }

    initialize(context: PluginContext): void {
        console.log('context: ', context);
    }

    getConfiguration(): Partial<PluginConfiguration> {
        return new PrListPluginConf();
    }
}


export class PrListPluginConf implements Partial<PluginConfiguration> {
    getAngularVersionCompatibility(): string {
        return '10.1.1';
    }

    getPermission(): Permission {
        return new Permission(true);
    }

    addListeners(): Array<Listener> {
        const themeChange = new Listener('Listening for Theming changes', 'theme:change',
            (m: Message) => {
                console.log('Theme changed....', m);
            });

        return [themeChange];


    }


}
