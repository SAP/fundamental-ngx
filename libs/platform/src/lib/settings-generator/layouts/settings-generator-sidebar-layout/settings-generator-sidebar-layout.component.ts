import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { BaseSettingsGeneratorLayout } from '../base-settings-generator-layout';

@Component({
    selector: 'fdp-settings-generator-sidebar-layout',
    templateUrl: './settings-generator-sidebar-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DestroyedService]
})
export class SettingsGeneratorSidebarLayoutComponent
    extends BaseSettingsGeneratorLayout
    implements OnInit, AfterViewInit
{
    /** @hidden */
    protected _destroy$ = inject(DestroyedService);
}
