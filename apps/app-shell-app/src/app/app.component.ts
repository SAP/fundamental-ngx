import {
    Component,
    OnInit
} from '@angular/core';
import {
    AppShellProviderService,
    MapMessage
} from '@fundamental-ngx/app-shell';

@Component({
    selector: 'aba-ngx-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    currentTheme = 'I know know';


    constructor(private appShell: AppShellProviderService) {
    }

    ngOnInit(): void {
        this.appShell.themeManager.onChange((m: MapMessage<string>) => {
            if (m) {
                this.currentTheme = m.get('name');
            }
        });

        this.appShell.shellBar.addProductMenu([
            {
                name: 'App 1',
                callback: () => {
                    alert('Application A Clicked');
                }
            },
            {
                name: 'App 2',
                callback: () => {
                    alert('Application B Clicked');
                }
            }
        ]);

        this.appShell?.shellBar.addThemeMenu([
            {
                id: 'sap_fiori_3',
                name: 'Fiori 3'
            },

            {
                id: 'sap_fiori_3_dark',
                name: 'Fiori 3 Dark'
            },
            {
                id: 'sap_fiori_3_hcb',
                name: 'High Contrast Black'
            },
            {
                id: 'sap_fiori_3_hcw',
                name: 'High Contrast White'
            }
        ]);

        this.appShell?.shellBar.addUserMenu([{
            text: 'Settings', callback: () => {
            }
        }, {
            text: 'Sign Out', callback: () => {
            }
        }]);

        this.appShell?.shellBar.setUser({
            initials: 'WW',
            colorAccent: 11
        });

        this.appShell.shellBar.setTitle('One Procurement');
        this.appShell.shellBar.setSubTitle('Solution for all');
    }
}
