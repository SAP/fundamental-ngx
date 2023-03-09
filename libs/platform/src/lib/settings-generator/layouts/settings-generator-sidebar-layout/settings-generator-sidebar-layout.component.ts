import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SettingsModel } from '../../models/settings.model';
import { SettingsGeneratorService } from '../../settings-generator.service';
import { SettingsGeneratorSectionDirective } from '../../directives/settings-generator-section.directive';

@Component({
    selector: 'fdp-settings-generator-sidebar-layout',
    templateUrl: './settings-generator-sidebar-layout.component.html',
    styleUrls: ['./settings-generator-sidebar-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SettingsGeneratorSidebarLayoutComponent implements OnInit, AfterViewInit {
    /** @hidden */
    private readonly _settingsGeneratorService = inject(SettingsGeneratorService);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    _settings: Nullable<SettingsModel>;

    /** @hidden */
    _selectedIndex: number;

    /** @hidden */
    @ViewChildren(SettingsGeneratorSectionDirective)
    contentDirectives: QueryList<SettingsGeneratorSectionDirective>;

    /** @hidden */
    constructor() {}

    /** @hidden */
    ngOnInit(): void {
        this._settingsGeneratorService.settings.subscribe((settings) => {
            this._settings = settings;
            this._cdr.detectChanges();
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setSelectedIndex(0);
    }

    /** @hidden */
    _setSelectedIndex(index: number): void {
        this._selectedIndex = index;
        // this.contentDirectives.forEach((directive, dIndex) => {
        //     directive.hidden = dIndex !== index;
        // });
    }
}
