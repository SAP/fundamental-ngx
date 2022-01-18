import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'fd-wizard-navigation',
    templateUrl: './wizard-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardNavigationComponent {
    /** Aria label for the wizard navigation component element. */
    @Input()
    ariaLabel = 'Wizard';
}
