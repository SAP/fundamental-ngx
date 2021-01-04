import { Directive, Input } from '@angular/core';

export type WizardSize = 'sm' | 'md' | 'lg' | 'xl';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-wizard-progress-bar]',
    host: {
        class: 'fd-wizard__progress-bar',
        '[class.fd-wizard__progress-bar--s]': 'size === "sm"',
        '[class.fd-wizard__progress-bar--m]': 'size === "md"',
        '[class.fd-wizard__progress-bar--l]': 'size === "lg"',
        '[class.fd-wizard__progress-bar--xl]': 'size === "xl"',
        '[style.display]': 'visible ? "" : "none"'
    }
})
export class WizardProgressBarDirective {
    /**
     * Size of the wizard progress bar.
     */
    @Input()
    size: WizardSize;

    /** @hidden */
    visible = true;
}
