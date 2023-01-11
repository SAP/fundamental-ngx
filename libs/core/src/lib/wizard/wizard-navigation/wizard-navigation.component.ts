import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { WIZARD, WizardComponentInterface } from '../wizard-injection-token';

@Component({
    selector: 'fd-wizard-navigation',
    templateUrl: './wizard-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardNavigationComponent {
    /** Aria label for the wizard navigation component element. */
    @Input()
    set ariaLabel(value: Nullable<string>) {
        this._ariaLabel = value;
    }
    get ariaLabel(): string | undefined {
        return this._ariaLabel ?? this._wizard?.ariaLabel;
    }

    /** @hidden */
    private _ariaLabel: Nullable<string>;

    /** @hidden */
    constructor(@Optional() @Inject(WIZARD) private _wizard?: WizardComponentInterface) {}
}
