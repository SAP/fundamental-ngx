import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injectable,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Validators } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { TitleComponent } from '@fundamental-ngx/core/title';
import {
    MessagePopoverComponent,
    MessagePopoverFormWrapperComponent,
    PlatformMessagePopoverModule
} from '@fundamental-ngx/platform/message-popover';
import {
    SettingsGeneratorComponent,
    SettingsGeneratorModule,
    SettingsModel
} from '@fundamental-ngx/platform/settings-generator';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface UserModel {
    email: string;
    name: string;
    language: 'en' | 'de';
    username: string;
    avatar: string;
    shipping: {
        address: string;
    };
}

@Injectable()
class ExampleUserService {
    private readonly _user$ = new BehaviorSubject<UserModel>({
        email: 'invalidEmail',
        name: 'John Doe',
        username: 'C78672634',
        language: 'de',
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
        shipping: {
            address: 'Walldorf, Baden-Württemberg'
        }
    });
    getUser(): Observable<UserModel> {
        return this._user$.asObservable();
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
        this._user$.next({
            ...this._user$.value,
            ...user,
            ...{ avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg` }
        });
    }
}
@Component({
    selector: 'fdp-settings-generator-message-popover-example',
    templateUrl: './settings-generator-message-popover-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ExampleUserService],
    standalone: true,
    imports: [
        TitleComponent,
        MessagePopoverFormWrapperComponent,
        SettingsGeneratorModule,
        BarModule,
        MessagePopoverComponent,
        PlatformMessagePopoverModule
    ]
})
export class SettingsGeneratorMessagePopoverExampleComponent implements AfterViewInit {
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
        private readonly _theming: ThemingService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _userService: ExampleUserService
    ) {}

    ngAfterViewInit(): void {
        const choices: SelectItem[] = this._theming.getThemes().map((theme) => ({
            label: theme.name + (this._theming.config.defaultTheme === theme.id ? ' (Default)' : ''),
            value: theme.id,
            description: theme.description
        }));

        const currentTheme = this._theming.getCurrentTheme();

        this.schema = {
            appearance: 'sidebar',
            sidebarWidth: {
                minWidth: '20rem',
                width: '20rem',
                maxWidth: '20rem'
            },
            items: [
                {
                    title: this._userService.getUser().pipe(map((res) => `User Account (${res.name})`)),
                    description: this._userService.getUser().pipe(map((res) => res.name)),
                    id: 'userAccount',
                    thumbnail: {
                        avatar: this._userService.getUser().pipe(map((res) => res.avatar))
                    },
                    groups: [
                        {
                            title: 'Contact information',
                            id: 'contact',
                            items: [
                                {
                                    name: 'username',
                                    message: 'Username',
                                    type: 'object-status',
                                    default: this._userService.getUser().pipe(map((res) => res.username)),
                                    guiOptions: {
                                        hint: {
                                            target: 'input',
                                            content: 'This is not editable text'
                                        },
                                        labelColumnLayout: {
                                            S: 12,
                                            M: 6
                                        },
                                        fieldColumnLayout: {
                                            S: 11,
                                            M: 6
                                        },
                                        status: 'critical',
                                        icon: 'account'
                                    }
                                },
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

    submit(): void {
        this.settingsGenerator
            .submit()
            .pipe(take(1))
            .subscribe((result: any) => {
                console.log(result);
                this._theming.setTheme(result.appearance.theme.theme);

                this._userService.setUser(result.userAccount.contact);
            });
    }
}
