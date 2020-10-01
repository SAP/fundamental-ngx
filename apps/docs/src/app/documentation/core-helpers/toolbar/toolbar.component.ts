import { Component, EventEmitter, Inject, Output, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';
import { ShellbarMenuItem, MenuKeyboardService, MenuComponent } from '@fundamental-ngx/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [MenuKeyboardService]
})
export class ToolbarDocsComponent implements OnInit {
    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

    @ViewChild('themeMenu')
    themeMenu: MenuComponent;

    cssUrl: SafeResourceUrl;

    library: string;

    version = {
        id: environment.version,
        url: ''
    };

    versions: any[];

    items: ShellbarMenuItem[] = [
        {
            name: 'Core Docs',
            callback: () => {
                this.routerService.navigate(['core/home']);
            }
        },
        {
            name: 'Platform Docs',
            callback: () => {
                this.routerService.navigate(['platform/home']);
            }
        }
    ];

    themes = [
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
    ];

    constructor(
        private routerService: Router,
        @Inject('CURRENT_LIB') private currentLib: Libraries,
        private menuKeyboardService: MenuKeyboardService,
        private sanitizer: DomSanitizer
    ) {
        this.library = routerService.routerState.snapshot.url.includes('core') ? 'Core' : 'Platform';
    }

    ngOnInit(): void {
        this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/sap_fiori_3.css');

        this.versions = [
            {id: '0.21.0', url: 'https://5f355f63718e9200075585e1--fundamental-ngx.netlify.app/'},
            {id: '0.20.0', url: 'https://5f0630964a7a370007f93dc4--fundamental-ngx.netlify.app/'},
            {id: '0.19.0', url: 'https://5ef288ca158ebd0008946f4d--fundamental-ngx.netlify.app/'},
            {id: '0.18.0', url: 'https://5ec04b7f46b9bd000648f8ec--fundamental-ngx.netlify.app/'},
            {id: '0.17.0', url: 'https://5e9a135cc7c8e90006047bdf--fundamental-ngx.netlify.app/'},
            {id: '0.16.0', url: 'https://5e97032838070600063141e4--fundamental-ngx.netlify.app/'},
            {id: '0.15.0', url: 'https://5e5fe7518009de0008f41fff--fundamental-ngx.netlify.app/'},
            {id: '0.14.0', url: 'https://5e4f1d0714bc4c000ae3282d--fundamental-ngx.netlify.app/'},
            {id: '0.13.0', url: 'https://5e25d4d1837fae0009b5c4fa--fundamental-ngx.netlify.app/'},
            {id: '0.12.0', url: 'https://5db1dc978d2a340009a82d64--fundamental-ngx.netlify.app/'},
            {id: '0.11.0', url: 'https://5d8a3409acaf8d00070ccd64--fundamental-ngx.netlify.app/'}
        ];

        this.versions.unshift(this.version);
    }

    selectTheme(selectedTheme: string): void {
        this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + selectedTheme + '.css');
    }

    selectVersion(version: any): void {
        window.open(version.url, '_blank');
    }
}
