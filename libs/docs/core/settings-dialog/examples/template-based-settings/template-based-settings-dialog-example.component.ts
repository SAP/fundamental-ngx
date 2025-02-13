import { CdkScrollable } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, signal } from '@angular/core';
import { ButtonBarComponent } from '@fundamental-ngx/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

import {
    SettingsContainerComponent,
    SettingsContentDirective,
    SettingsDetailAreaDirective,
    SettingsHeaderButtonDirective,
    SettingsHeaderDirective,
    SettingsListAreaDirective,
    SettingsListContainerDirective
} from '@fundamental-ngx/core/settings';

import { BarComponent, BarElementDirective, BarLeftDirective, BarMiddleDirective } from '@fundamental-ngx/core/bar';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogService,
    DialogTemplateDirective
} from '@fundamental-ngx/core/dialog';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

import { InputGroupComponent } from '@fundamental-ngx/core/input-group';
import { ListComponent, ListItemComponent, ListLinkDirective, ListTitleDirective } from '@fundamental-ngx/core/list';

import { IconTabBarComponent, IconTabBarTabComponent } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fd-template-based-settings-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './template-based-settings-dialog-example.component.html',
    imports: [
        TitleComponent,
        DialogTemplateDirective,
        DialogFooterComponent,
        CdkScrollable,
        ScrollbarDirective,
        ButtonComponent,
        DialogComponent,
        ButtonBarComponent,
        DialogBodyComponent,
        SettingsListAreaDirective,
        SettingsListContainerDirective,
        SettingsDetailAreaDirective,
        SettingsContentDirective,
        SettingsHeaderDirective,
        SettingsHeaderButtonDirective,
        SettingsContainerComponent,
        BarElementDirective,
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        InputGroupComponent,
        ListComponent,
        ListItemComponent,
        ListLinkDirective,
        ListTitleDirective,
        IconTabBarComponent,
        IconTabBarTabComponent,
        CommonModule
    ]
})
export class TemplateBasedSettingsDialogExampleComponent {
    confirmationReason = signal<string>('');

    constructor(private _dialogService: DialogService) {}

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, {
            settings: true,
            ariaLabelledBy: 'fd-settings-dialog-header-1',
            ariaDescribedBy: 'fd-settings-dialog-body-1',
            focusTrapped: true
        });

        dialogRef.afterClosed.subscribe(
            (result) => this.confirmationReason.set(`Dialog closed with result: ${result}`),
            (error) => this.confirmationReason.set(`Dialog dismissed with result: ${error}`)
        );
    }
}
