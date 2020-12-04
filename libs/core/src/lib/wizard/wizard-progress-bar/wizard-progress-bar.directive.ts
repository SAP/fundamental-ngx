import { Directive, ElementRef, Input, OnInit } from '@angular/core';

export type WizardSize = 'sm' | 'md' | 'lg' | 'xl';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-wizard-progress-bar]',
    host: {
        class: 'fd-wizard__progress-bar',
        '[class.fd-wizard__progress-bar--s]': 'size === "sm"',
        '[class.fd-wizard__progress-bar--m]': 'size === "md"',
        '[class.fd-wizard__progress-bar--l]': 'size === "lg"',
        '[class.fd-wizard__progress-bar--xl]': 'size === "xl"'
    }
})
export class WizardProgressBarDirective implements OnInit {
    /**
     * Size of the wizard progress bar.
     */
    @Input()
    size: WizardSize;

    /** @hidden */
    initDisplay: string;

    /** @hidden */
    ngOnInit(): void {
        this.initDisplay = this._elRef.nativeElement.style.display;
    }

    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    setCssDisplay(visible: boolean): void {
        if (visible) {
            this._elRef.nativeElement.style.display = this.initDisplay;
        } else {
            this._elRef.nativeElement.style.display = 'none';
        }
    }
}
