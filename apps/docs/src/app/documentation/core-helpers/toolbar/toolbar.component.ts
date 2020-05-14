import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Output,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';
import { ShellbarMenuItem, ShellbarUser, ShellbarUserMenu, MenuKeyboardService } from '@fundamental-ngx/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [MenuKeyboardService]
})
export class ToolbarComponent implements OnInit {
    cssUrl: string;

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

    isOpen: boolean = false;

    action = {
        glyph: 'palette'
    };

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

    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

    version: string = environment.version;

    public library: string;

    ngOnInit(): void {
        this.cssUrl = 'assets/sap_fiori_3.css';
    }

    constructor(
        private routerService: Router,
        @Inject('CURRENT_LIB') private currentLib: Libraries,
        private menuKeyboardService: MenuKeyboardService,
        private sanitizer: DomSanitizer
    ) {
        this.library = routerService.routerState.snapshot.url.includes('core') ? 'Core' : 'Platform';
    }

    selectTheme(selectedTheme: string) {
        this.isOpen = false;
        this.cssUrl = 'assets/' + selectedTheme + '.css';
    }

    getCSSUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.cssUrl);
    }
}
