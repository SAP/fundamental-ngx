import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injectable,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { SettingsGeneratorComponent, SettingsModel } from '@fundamental-ngx/platform/settings-generator';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';

export interface UserModel {
    email: string;
    name: string;
    language: 'en' | 'de';
    shipping: {
        address: string;
    };
}

@Injectable()
export class ExampleUserService {
    private readonly _user$ = new BehaviorSubject<UserModel>({
        email: 'john.doe@sap.com',
        name: 'John Doe',
        language: 'de',
        shipping: {
            address: 'Walldorf, Baden-Württemberg'
        }
    });
    getUser(): Observable<UserModel> {
        return this._user$.pipe(delay(2000));
    }

    getLanguages(): Observable<SelectItem[]> {
        const languages: SelectItem[] = [
            {
                value: 'en',
                label: 'English'
            },
            {
                value: 'de',
                label: 'Deutsch'
            }
        ];
        return of(languages);
    }

    setUser(user: UserModel): void {
        this._user$.next({ ...this._user$.value, ...user });
    }
}

@Component({
    selector: 'fdp-settings-generator-dialog-example',
    templateUrl: './settings-generator-dialog-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ExampleUserService]
})
export class SettingsGeneratorDialogExampleComponent {
    confirmationReason: string;

    @ViewChild('privacyContent')
    privacyContent: TemplateRef<any>;

    @ViewChild('termsOfServiceContent')
    termsOfServiceContent: TemplateRef<any>;

    @ViewChild('themeListItemTemplate')
    themeListItemTemplate: TemplateRef<any>;

    @ViewChild(SettingsGeneratorComponent)
    settingsGenerator: SettingsGeneratorComponent;

    schema: SettingsModel;

    constructor(
        private _dialogService: DialogService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _theming: ThemingService,
        private readonly _userService: ExampleUserService
    ) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            responsivePadding: true,
            minWidth: '50vw',
            maxWidth: '900px',
            maxHeight: '80vh',
            ariaLabelledBy: 'fd-dialog-header-10',
            ariaDescribedBy: 'fd-dialog-body-10',
            focusTrapped: true,
            disablePaddings: true
        });

        dialogRef.afterClosed.subscribe({
            next: (result) => (this.confirmationReason = 'Dialog closed with result: ' + result),
            error: (error) => (this.confirmationReason = 'Dialog dismissed with result: ' + error)
        });
    }

    submitSettings(settingsGenerator: SettingsGeneratorComponent, dialog: DialogRef): void {
        settingsGenerator.submit().subscribe((data) => {
            console.log(data);
            dialog.close('Save');
        });
    }

    ngAfterViewInit(): void {
        const choices: SelectItem[] = this._theming.getThemes().map((theme) => ({
            label: theme.name + (this._theming.config.defaultTheme === theme.id ? ' (Default)' : ''),
            value: theme.id,
            description: theme.description
            // template: this.themeListItemTemplate
        }));

        const currentTheme = this._theming.getCurrentTheme();

        this.schema = {
            appearance: 'sidebar',
            items: [
                {
                    title: this._userService.getUser().pipe(map((res) => `User Account (${res.name})`)),
                    description: this._userService.getUser().pipe(map((res) => res.name)),
                    id: 'userAccount',
                    thumbnail: {
                        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
                    },
                    groups: [
                        {
                            title: 'Contact information',
                            id: 'contact',
                            items: [
                                {
                                    name: 'email',
                                    message: 'Email',
                                    type: 'input',
                                    controlType: 'email',
                                    default: this._userService.getUser().pipe(map((res) => res.email)),
                                    validators: [Validators.required, Validators.email],
                                    guiOptions: {
                                        labelColumnLayout: {
                                            S: 12,
                                            M: 6
                                        },
                                        fieldColumnLayout: {
                                            S: 11,
                                            M: 6
                                        }
                                    }
                                },
                                {
                                    name: 'name',
                                    message: 'Full name',
                                    type: 'input',
                                    controlType: 'text',
                                    default: this._userService.getUser().pipe(map((res) => res.name)),
                                    guiOptions: {
                                        labelColumnLayout: {
                                            S: 12,
                                            M: 6
                                        },
                                        fieldColumnLayout: {
                                            S: 11,
                                            M: 6
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            title: 'Shipping information',
                            id: 'shipping',
                            items: [
                                {
                                    name: 'shippingAddress',
                                    message: 'Shipping Address',
                                    type: 'input',
                                    default: this._userService.getUser().pipe(map((res) => res.shipping.address)),
                                    guiOptions: {
                                        labelColumnLayout: {
                                            S: 12,
                                            M: 6
                                        },
                                        fieldColumnLayout: {
                                            S: 11,
                                            M: 6
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Appearance',
                    description: 'Configure theme and language',
                    id: 'appearance',
                    thumbnail: {
                        icon: 'globe'
                    },
                    groups: [
                        {
                            title: 'Theme',
                            id: 'theme',
                            items: [
                                {
                                    type: 'theme-list',
                                    name: 'theme',
                                    message: 'Theme',
                                    choices,
                                    default: currentTheme?.id,
                                    guiOptions: {
                                        noLabelLayout: true
                                    }
                                }
                            ]
                        },
                        {
                            title: 'Language',
                            id: 'language',
                            items: [
                                {
                                    type: 'select',
                                    name: 'language',
                                    message: 'Language',
                                    choices: this._userService.getLanguages(),
                                    default: this._userService.getUser().pipe(map((res) => res.language))
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Date & Time',
                    description: 'Configure date and time formats',
                    id: 'dateTime',
                    thumbnail: {
                        icon: 'date-time'
                    },
                    items: [
                        {
                            type: 'select',
                            name: 'timeFormat',
                            message: 'Time format',
                            choices: ['AM/PM', '24 hour'],
                            default: '24 hour'
                        },
                        {
                            type: 'select',
                            name: 'dateFormat',
                            message: 'Date format',
                            choices: ['mm/dd/yy', 'dd.mm.yyyy'],
                            default: 'dd.mm.yyyy'
                        }
                    ]
                },
                {
                    title: 'Legal',
                    thumbnail: {
                        icon: 'locked'
                    },
                    groups: [
                        {
                            title: 'Privacy Policy',
                            template: this.privacyContent
                        },
                        {
                            title: 'Terms of Service',
                            template: this.termsOfServiceContent
                        }
                    ]
                }
            ]
        };
        this._cdr.detectChanges();
    }
}
