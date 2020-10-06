import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-wizard-navigation',
    templateUrl: './wizard-navigation.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardNavigationComponent {
    /** Aria label for the wizard navigation component element. */
    @Input()
    ariaLabel?: string = null;
}
