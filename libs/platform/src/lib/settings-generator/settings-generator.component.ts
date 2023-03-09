import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FormGeneratorService } from '@fundamental-ngx/platform/form';
import { SettingsModel } from './models/settings.model';
import { SettingsGeneratorReturnValue, SettingsGeneratorService } from './settings-generator.service';
import { ThemeSelectorListComponent } from './controls/theme-selector-list/theme-selector-list.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'fdp-settings-generator',
    templateUrl: './settings-generator.component.html',
    styleUrls: ['./settings-generator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SettingsGeneratorService]
})
export class SettingsGeneratorComponent {
    /**
     * Initial settings configuration.
     */
    @Input()
    set settings(value: Nullable<SettingsModel>) {
        this._settings = value;
        this._settingsGeneratorService.settings.next(value);
    }

    get settings(): Nullable<SettingsModel> {
        return this._settings;
    }

    /** @hidden */
    private _settings: Nullable<SettingsModel>;

    /** @hidden */
    private readonly _settingsGeneratorService = inject(SettingsGeneratorService);

    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fdp-settings-generator';

    /** @hidden */
    constructor(private readonly _fgService: FormGeneratorService) {
        this._fgService.addComponent(ThemeSelectorListComponent, ['theme-list']);
    }

    /** @Hidden */
    submit(): Observable<SettingsGeneratorReturnValue> {
        return this._settingsGeneratorService.submit();
    }
}
