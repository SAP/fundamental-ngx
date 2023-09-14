import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PipeModule, RepeatModule } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SelectModule } from '@fundamental-ngx/core/select';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TableModule } from '@fundamental-ngx/core/table';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TokenComponent, TokenizerComponent, TokenizerInputDirective } from '@fundamental-ngx/core/token';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';

import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { VhdBaseTab } from './components/base-tab/vhd-base-tab.component';
import { DefineTabComponent } from './components/define-tab/define-tab.component';
import { SelectTabComponent } from './components/select-tab/select-tab.component';
import { VhdFilterComponent } from './components/value-help-dialog-filter/value-help-dialog-filter.component';
import { ConditionCountMessageDirective } from './directives/condition-count-message.directive';
import { PlatformValueHelpDialogComponent } from './value-help-dialog/value-help-dialog.component';

@NgModule({
    declarations: [
        PlatformValueHelpDialogComponent,
        VhdFilterComponent,
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
        TokenComponent,
        TokenizerComponent,
        TokenizerInputDirective,
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
        ScrollbarModule,
        SkeletonModule,
        RepeatModule
    ],
    exports: [PlatformValueHelpDialogComponent, VhdFilterComponent, ContentDensityModule]
})
export class PlatformValueHelpDialogModule {}
