import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from '@angular/core';
import { Nullable } from '@fundamental-ngx/core/shared';
import { WIZARD, WizardComponentInterface } from '../wizard-injection-token';

@Component({
    selector: 'fd-wizard-navigation',
    templateUrl: './wizard-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardNavigationComponent {
    /** Aria label for the wizard navigation component element. */
    @Input()
    get ariaLabel(): string | undefined {
        return this._ariaLabel ?? this._wizard?.ariaLabel;
    }
    set ariaLabel(value: Nullable<string>) {
        this._ariaLabel = value;
    }

    /** @hidden */
    private _ariaLabel: Nullable<string>;

    constructor(@Optional() @Inject(WIZARD) private _wizard?: WizardComponentInterface) {}
}
