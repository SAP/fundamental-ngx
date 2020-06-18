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

    version: string = environment.version;

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
    }

    selectTheme(selectedTheme: string): void {
        if (this.themeMenu.isOpen) {
            this.themeMenu.close();
            this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + selectedTheme + '.css');
        }
    }
}
