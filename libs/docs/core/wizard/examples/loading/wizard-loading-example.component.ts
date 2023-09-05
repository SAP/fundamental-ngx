import { A11yModule } from '@angular/cdk/a11y';
import { NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { WizardModule, WizardService, WizardStepComponent } from '@fundamental-ngx/core/wizard';

@Component({
    selector: 'fd-wizard-loading-example',
    templateUrl: './wizard-loading-example.component.html',
    styleUrls: ['./wizard-loading-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-wizard-example'
    },
    standalone: true,
    imports: [ButtonModule, A11yModule, NgIf, WizardModule, RepeatDirective, SkeletonModule, BarModule]
})
export class WizardLoadingExampleComponent {
    /**
     * documentation related property
     * provides access to the HTML element with "overlay" reference
     */
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    /**
     * documentation related property
     * specifies if the doc example is rendered in fullscreen or not
     */
    fullscreen = false;

    /** @hidden */
    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    constructor(private _wizardService: WizardService) {}

    /**
     * documentation related function
     * opens the example in full screen
     */
    enterFullscreenExample(): void {
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
    }

    /**
     * documentation related function
     * exits the full screen mode of the example
     */
    exitFullscreenExample(event: Event): void {
        event.stopPropagation();
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }

    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.steps, index);
    }
}
