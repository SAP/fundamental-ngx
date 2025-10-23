import { CdkScrollable } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, signal } from '@angular/core';
import { ButtonBarComponent, CheckboxComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarElementDirective, BarLeftDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogService,
    DialogTemplateDirective
} from '@fundamental-ngx/core/dialog';
import {
    ListComponent,
    ListContentDirective,
    ListGroupHeaderDirective,
    ListIconDirective,
    ListItemComponent,
    ListLinkDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import {
    SettingsContainerComponent,
    SettingsContentContainerDirective,
    SettingsContentDirective,
    SettingsListAreaDirective,
    SettingsListContainerDirective,
    SettingsProfileCardDirective,
    SettingsProfileCardNameDirective,
    SettingsProfileCardSublineDirective
} from '@fundamental-ngx/core/settings';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { IconTabBarComponent, IconTabBarTabComponent } from '@fundamental-ngx/platform/icon-tab-bar';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'fd-template-based-settings-dialog-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './template-based-settings-dialog-example.component.html',
    imports: [
        AvatarComponent,
        BarElementDirective,
        BarComponent,
        BarLeftDirective,
        ButtonComponent,
        ButtonBarComponent,
        CheckboxComponent,
        ComboboxComponent,
        CommonModule,
        CdkScrollable,
        DialogComponent,
        DialogBodyComponent,
        DialogTemplateDirective,
        DialogFooterComponent,
        FormsModule,
        FormItemComponent,
        FormLabelComponent,
        IconTabBarComponent,
        IconTabBarTabComponent,
        ListComponent,
        ListItemComponent,
        ListIconDirective,
        ListLinkDirective,
        ListTitleDirective,
        ListTitleDirective,
        ListGroupHeaderDirective,
        ListContentDirective,
        SettingsContentContainerDirective,
        SettingsListAreaDirective,
        SettingsListContainerDirective,
        SettingsContentDirective,
        SettingsContainerComponent,
        SettingsProfileCardDirective,
        SettingsProfileCardNameDirective,
        SettingsProfileCardSublineDirective,
        ScrollbarDirective,
        TitleComponent,
        ToolbarComponent
    ]
})
export class TemplateBasedSettingsDialogExampleComponent {
    languages = ['English (United States)', 'English (Canada)', 'French', 'German', 'Spanish', 'Bulgarian'];

    regions = ['United States', 'Canada', 'France', 'Germany', 'Spain', 'Bulgaria'];

    dateFormats = ['MM.DD.YYYY', 'DD.MM.YYYY', 'YYYY-MM-DD'];

    timeFormats = ['12 Hour', '24 Hour'];

    timeZones = [
        'Eastern Standard Time (UTC-05:00)',
        'Central European Time (UTC+01:00)',
        'Greenwich Mean Time (UTC+00:00)',
        'Pacific Standard Time (UTC-08:00)',
        'Mountain Standard Time (UTC-07:00)',
        'Eastern European Time (UTC+02:00)'
    ];

    currencies = ['USD - United States Dollar', 'CAD - Canadian Dollar', 'EUR - Euro', 'BGN - Bulgarian Lev'];

    numberFormats = ['1,234.56', '1 234,56', '1.234,56'];

    selectedLanguage = this.languages[0];
    selectedRegion = this.regions[0];
    selectedDateFormat = this.dateFormats[0];
    selectedTimeFormat = this.timeFormats[0];
    selectedTimeZone = this.timeZones[0];
    selectedCurrency = this.currencies[0];
    selectednumberFormat = this.numberFormats[0];

    checkboxValue = true;

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

    onZoomGlyphClick(): void {
        alert('Edit Avatar');
    }
}
