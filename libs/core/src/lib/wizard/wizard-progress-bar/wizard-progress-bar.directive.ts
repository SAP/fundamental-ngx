import { Directive, Input } from '@angular/core';

export type WizardSize = 'sm' | 'md' | 'lg' | 'xl';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-wizard-progress-bar]',
    host: {
        class: 'fd-wizard__progress-bar',
        '[class.fd-wizard__progress-bar--sm]': 'size === "sm"',
        '[class.fd-wizard__progress-bar--md]': 'size === "md"',
        '[class.fd-wizard__progress-bar--lg]': 'size === "lg"',
        '[class.fd-wizard__progress-bar--xl]': 'size === "xl"',
        '[style.display]': 'visible ? "" : "none"'
    }
})
export class WizardProgressBarDirective {
    /**
     * Size (horizontal paddings) of the wizard progress bar.
     */
    @Input()
    size: WizardSize = null;

    /** @hidden */
    visible = true;
}
