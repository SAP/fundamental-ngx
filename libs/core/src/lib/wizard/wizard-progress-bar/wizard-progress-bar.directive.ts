import { Directive, Input } from '@angular/core';

export type WizardSize = 'sm' | 'md' | 'lg' | 'xl';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-wizard-progress-bar]',
    host: {
        class: 'fd-wizard__progress-bar',
        '[class.fd-wizard__progress-bar--s]': 'size === "s"',
        '[class.fd-wizard__progress-bar--m]': 'size === "m"',
        '[class.fd-wizard__progress-bar--l]': 'size === "l"',
        '[class.fd-wizard__progress-bar--xl]': 'size === "xl"'
    }
})
export class WizardProgressBarDirective {
    /**
     * Size of the wizard progress bar.
     */
    @Input()
    size: WizardSize;
}
