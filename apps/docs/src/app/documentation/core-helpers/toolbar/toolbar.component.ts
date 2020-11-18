import { Component, EventEmitter, Inject, Output, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';
import { ShellbarMenuItem, MenuKeyboardService, MenuComponent, ThemesService } from '@fundamental-ngx/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DocsThemeService } from '../../services/docs-theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'fd-docs-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [MenuKeyboardService, ThemesService]
})
export class ToolbarDocsComponent implements OnInit, OnDestroy {
    @Output()
    btnClicked: EventEmitter<undefined> = new EventEmitter<undefined>();

    @ViewChild('themeMenu')
    themeMenu: MenuComponent;

    cssUrl: SafeResourceUrl;
    customCssUrl: SafeResourceUrl;

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
                this._routerService.navigate(['core/home']);
            }
        },
        {
            name: 'Platform Docs',
            callback: () => {
                this._routerService.navigate(['platform/home']);
            }
        }
    ];

    themes = this._themesService.themes;

    /** An RxJS Subject that will kill the data stream upon destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _routerService: Router,
        private _themesService: ThemesService,
        private _docsThemeService: DocsThemeService,
        @Inject('CURRENT_LIB') private _currentLib: Libraries,
    ) {
        this.library = _routerService.routerState.snapshot.url.includes('core') ? 'Core' : 'Platform';

        this._docsThemeService.onThemeChange.pipe(
            takeUntil(this._onDestroy$)
        ).subscribe(theme => {
            this.cssUrl = theme.themeUrl;
            this.customCssUrl = theme.customThemeUrl;
        })
    }

    ngOnInit(): void {
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

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    selectTheme(selectedTheme: string): void {
        this.cssUrl = this._themesService.setTheme(selectedTheme);
        this.customCssUrl = this._themesService.setCustomTheme(selectedTheme);
    }

    selectVersion(version: any): void {
        window.open(version.url, '_blank');
    }
}
