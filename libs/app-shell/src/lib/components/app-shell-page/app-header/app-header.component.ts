import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {
    ShellbarUser,
    ShellbarUserMenu
} from '@fundamental-ngx/core';
import {
    DomSanitizer,
    SafeResourceUrl
} from '@angular/platform-browser';


/**
 * FDS stands for fundamental-shell
 */
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
     * Shellbar title.
     */
    @Input()
    title: string;

    /**
     * Shellbar sub-title.
     */
    @Input()
    subTitle: string;

    /**
     * Toggles display of "product menu".
     */
    @Input()
    hasProductMenu = false;

    /**
     * Hide display of "product switcher" button.
     */
    @Input()
    hideProductSwitcher = false;

    /**
     * Tooltip label for product switcher button.
     */
    @Input()
    productSwitcherLabel = 'Product Switcher';

    /**
     * Show "back" button.
     */
    @Input()
    showBackButton = false;

    /**
     * "back" button label.
     */
    @Input()
    backButtonLabel = 'Go Back';

    cssUrl: SafeResourceUrl;

    /**
     * Emitted event when "back" button is clicked.
     */
    @Output()
    backButtonClick: EventEmitter<void> = new EventEmitter();

    /**
     * Emitted event when "logo" is clicked.
     */
    @Output()
    logoClick: EventEmitter<void> = new EventEmitter();


    // todo: replace all this with logic and object that we have in the app-framework
    user: ShellbarUser = {
        initials: 'WW',
        colorAccent: 11
    };

    userMenu: ShellbarUserMenu[] = [
        { text: 'Settings', callback: () => {} },
        { text: 'Sign Out', callback: () => {} }
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

    constructor(private sanitizer: DomSanitizer) {
    }


    ngOnInit(): void {
        this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/theme/sap_fiori_3.css');
        console.log(this.cssUrl)
    }

    onSelectTheme(selectedTheme: string): void {
        this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/theme/' + selectedTheme + '.css');
    }

    onLogoClick($event: Event): void {
        $event.preventDefault();
        this.logoClick.emit();
    }
}
