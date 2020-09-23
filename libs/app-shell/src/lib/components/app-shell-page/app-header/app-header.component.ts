import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { ShellbarComponent } from '@fundamental-ngx/core';
import {
    DomSanitizer,
    SafeResourceUrl
} from '@angular/platform-browser';
import { AppShellProviderService } from '../../../api/app-shell-provider.service';
import { ShellBarService } from '../../../api/extensions/shell-bar.service';
import { IS_APPSHELL_STANDALONE } from '../../../tokens';


@Component({
    selector: 'fds-app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellHeaderComponent implements OnInit {
    /**
     * Source path to logo image.
     */
    @Input()
    logoSrc: string;

    /**
     * `alt` text for logo image.
     */
    @Input()
    logoAlt: string;

    /**
     * Emitted event when "logo" is clicked.
     */
    @Output()
    logoClick: EventEmitter<void> = new EventEmitter();

    @ContentChild(ShellbarComponent, { static: true })
    shellBar: ShellbarComponent;


    /**
     * @hidden
     */
    _cssUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer,
                public _appShell: AppShellProviderService,
                @Inject(IS_APPSHELL_STANDALONE) public _isStandalone: boolean) {
    }


    ngOnInit(): void {
        if (this._isStandalone) {
            this._cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/theme/sap_fiori_3.css');
        }
    }

    onSelectTheme(id: string, name: string): void {
        this._cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/theme/' + id + '.css');
        this._appShell.themeManager.themeChanged(id, name);
    }

    onLogoClick($event: Event): void {
        $event.preventDefault();
        this.logoClick.emit();
    }

    private initShellBar(shellBar: ShellBarService): void {
        if (!shellBar) {
            return;
        }


    }
}
