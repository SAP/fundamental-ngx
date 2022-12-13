import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TokenModule } from '@fundamental-ngx/core/token';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { TableModule } from '@fundamental-ngx/core/table';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { LinkModule } from '@fundamental-ngx/core/link';
import { BarModule } from '@fundamental-ngx/core/bar';
import { SelectModule } from '@fundamental-ngx/core/select';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

import { PlatformValueHelpDialogComponent } from './value-help-dialog/value-help-dialog.component';
import { VhdFilterComponent } from './components/value-help-dialog-filter/value-help-dialog-filter.component';
import { VhdSearchComponent } from './components/value-help-dialog-search/value-help-dialog-search.component';
import { VhdBaseTab } from './components/base-tab/vhd-base-tab.component';
import { SelectTabComponent } from './components/select-tab/select-tab.component';
import { DefineTabComponent } from './components/define-tab/define-tab.component';
import { ConditionCountMessageDirective } from './directives/condition-count-message.directive';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';

@NgModule({
    declarations: [
        PlatformValueHelpDialogComponent,
        VhdFilterComponent,
        VhdSearchComponent,
        VhdBaseTab,
        SelectTabComponent,
        DefineTabComponent,
        ConditionCountMessageDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        BarModule,
        DialogModule,
        TabsModule,
        ButtonModule,
        TokenModule,
        FormModule,
        BusyIndicatorModule,
        I18nModule,
        LayoutGridModule,
        ToolbarModule,
        TableModule,
        CheckboxModule,
        PipeModule,
        IconModule,
        ListModule,
        BarModule,
        LinkModule,
        SelectModule,
        PanelModule,
        InputGroupModule,
        PopoverModule,
        InfiniteScrollModule,
        PlatformSearchFieldModule,
        ContentDensityModule,
        PlatformContentDensityDeprecationsModule,
        ScrollbarModule
    ],
    exports: [
        PlatformValueHelpDialogComponent,
        VhdFilterComponent,
        VhdSearchComponent,
        ContentDensityModule,
        PlatformContentDensityDeprecationsModule
    ]
})
export class PlatformValueHelpDialogModule {}
