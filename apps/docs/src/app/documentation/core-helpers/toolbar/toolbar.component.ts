import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Libraries } from '../../utilities/libraries';
import { MenuComponent, MenuKeyboardService, ShellbarMenuItem, ShellbarSizes, ThemesService } from '@fundamental-ngx/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DocsThemeService } from '../../services/docs-theme.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';


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

    size: ShellbarSizes = 'm';

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
        });
    }

    ngOnInit(): void {
        this.versions = [
            {id: '0.27.0', url: 'https://602a61e08b3cf200074fa0b5--fundamental-ngx.netlify.app/'},
            {id: '0.26.0', url: 'https://600860290fee570007d7f660--fundamental-ngx.netlify.app/'},
            {id: '0.25.1', url: 'https://5fdb2c4892110a00080b0895--fundamental-ngx.netlify.app/'},
            {id: '0.24.1', url: 'https://5fbd1c1239f44a000736c439--fundamental-ngx.netlify.app/'},
            {id: '0.23.0', url: 'https://5f96ff4047c5f300070eb8a1--fundamental-ngx.netlify.app/'},
            {id: '0.22.0', url: 'https://5f776fb812cfa300086de86a--fundamental-ngx.netlify.app/'},
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

        if (!(this.cssUrl && this.customCssUrl)) {
            this.selectTheme(this.themes[0].id);
        }

        fromEvent(window, 'resize')
            .pipe(startWith(1), debounceTime(60), takeUntil(this._onDestroy$))
            .subscribe(() => this.size = this._getShellbarSize());
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

    private _getShellbarSize(): ShellbarSizes {
        const width = window.innerWidth;
        return width < 599 ? 's' : 'm';
    }
}
