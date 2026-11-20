import { PortalModule } from '@angular/cdk/portal';
import { Component, TemplateRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
    BaseToastDurationDismissibleConfig,
    BaseToastDurationDismissibleContainerComponent
} from '@fundamental-ngx/cdk/utils';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { MessageBoxService } from '@fundamental-ngx/core/message-box';
import {
    MessageToastConfig,
    MessageToastService,
    provideMessageToastConfig
} from '@fundamental-ngx/core/message-toast';
import { SettingsContainerComponent } from '@fundamental-ngx/core/settings';
import {
    UserMenuBodyComponent,
    UserMenuComponent,
    UserMenuContentContainerComponent,
    UserMenuControlComponent,
    UserMenuControlElementDirective,
    UserMenuHeaderDirective,
    UserMenuListComponent,
    UserMenuListItemComponent,
    UserMenuSublistComponent,
    UserMenuUserNameDirective
} from '@fundamental-ngx/core/user-menu';
import { PlatformSelectModule, PreparedDynamicFormFieldItem } from '@fundamental-ngx/platform/form';
import { SearchFieldComponent } from '@fundamental-ngx/platform/search-field';
import {
    ThemeSelectorListComponent,
    ThemeSelectorListIconComponent
} from '@fundamental-ngx/platform/settings-generator';

@Component({
    selector: 'e2e-csp-base-toast',
    template: 'Base toast<ng-template cdkPortalOutlet />',
    imports: [PortalModule],
    host: { class: 'base-toast-consumer' }
})
export class StyleCspBaseToastComponent extends BaseToastDurationDismissibleContainerComponent<BaseToastDurationDismissibleConfig> {
    constructor() {
        super({ animated: new URLSearchParams(location.search).get('animated') !== 'false' });
    }
}

@Component({
    selector: 'e2e-style-csp',
    templateUrl: './style-csp.component.html',
    styleUrl: './style-csp.component.scss',
    imports: [
        ReactiveFormsModule,
        PlatformSelectModule,
        SearchFieldComponent,
        SettingsContainerComponent,
        UserMenuComponent,
        UserMenuControlComponent,
        UserMenuControlElementDirective,
        UserMenuBodyComponent,
        UserMenuHeaderDirective,
        UserMenuUserNameDirective,
        UserMenuContentContainerComponent,
        UserMenuListComponent,
        UserMenuListItemComponent,
        UserMenuSublistComponent,
        ThemeSelectorListComponent,
        ThemeSelectorListIconComponent,
        StyleCspBaseToastComponent
    ],
    providers: [MessageBoxService, MessageToastService, provideMessageToastConfig(new MessageToastConfig())]
})
export class StyleCspComponent {
    readonly scenario = inject(ActivatedRoute).snapshot.queryParamMap.get('case');
    readonly animated = inject(ActivatedRoute).snapshot.queryParamMap.get('animated') !== 'false';
    readonly value = new FormControl();
    readonly options = [
        { label: 'Apple', value: 'apple', secondaryText: 'Fruit' },
        { label: 'Carrot', value: 'carrot', secondaryText: 'Vegetable' }
    ];
    readonly menuItems = Array.from({ length: 24 }, (_, index) => `Action ${index + 1}`);
    readonly baseVisible = signal(true);
    readonly baseStatus = signal('initial');
    readonly form = new FormGroup({ appearance: new FormGroup({ theme: new FormControl('sap_horizon') }) });
    readonly dialogService = inject(DialogService);
    readonly messageBoxService = inject(MessageBoxService);
    readonly toastService = inject(MessageToastService);

    themeItem(template: TemplateRef<unknown>): PreparedDynamicFormFieldItem {
        return {
            type: 'select',
            name: 'theme',
            message: 'Theme',
            default: 'sap_horizon',
            choices: [
                { value: 'sap_horizon', label: 'Morning Horizon' },
                { value: 'sap_horizon_dark', label: 'Evening Horizon' },
                { value: 'custom', label: 'Custom preview', template }
            ]
        };
    }

    openDialog(): void {
        const ref = this.dialogService.open(
            { title: 'CSP Dialog', cancelButton: 'Close', cancelButtonCallback: () => ref.close() },
            { containerClass: 'csp-dialog-consumer' }
        );
    }

    openMessageBox(): void {
        const ref = this.messageBoxService.open(
            {
                title: 'CSP Message Box',
                content: 'Message box content',
                cancelButton: 'Close',
                cancelButtonCallback: () => ref.close()
            },
            { containerClass: 'csp-message-box-consumer' }
        );
    }

    openToast(): void {
        this.toastService.open('CSP toast content', { animated: this.animated, duration: 800, width: 240 });
    }

    enterBase(toast: StyleCspBaseToastComponent): void {
        toast.onEnter$.subscribe(() => this.baseStatus.set('entered'));
        toast.enter();
    }

    exitBase(toast: StyleCspBaseToastComponent): void {
        toast.onExit$.subscribe(() => {
            this.baseStatus.set('exited');
            this.baseVisible.set(false);
        });
        toast.exit();
    }
}
