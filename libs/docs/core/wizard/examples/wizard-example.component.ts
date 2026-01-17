import { A11yModule } from '@angular/cdk/a11y';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormControlComponent, FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { LayoutGridColDirective, LayoutGridComponent, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { WizardModule, WizardService, WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';

@Component({
    selector: 'fd-wizard-example',
    templateUrl: './wizard-example.component.html',
    styleUrls: ['./wizard-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-wizard-example'
    },
    imports: [
        ButtonComponent,
        A11yModule,
        WizardModule,
        TitleComponent,
        MessageStripComponent,
        ContentDensityDirective,
        FormItemComponent,
        FormLabelComponent,
        FormControlComponent,
        FormsModule,
        LayoutGridComponent,
        LayoutGridRowDirective,
        LayoutGridColDirective,
        LinkComponent,
        RouterLink,
        BarModule
    ]
})
export class WizardExampleComponent {
    /**
     * documentation related property
     * provides access to the HTML element with "overlay" reference
     */
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    /**
     * documentation related property
     * specifies if the doc example is rendered in fullscreen or not
     */
    fullscreen = false;

    step1status: WizardStepStatus = 'current';
    step2status: WizardStepStatus = 'upcoming';
    step3status: WizardStepStatus = 'upcoming';
    step4status: WizardStepStatus = 'upcoming';
    summaryStatus: WizardStepStatus = 'upcoming';

    fullName = '';
    addressLine1 = '';
    addressLine2 = '';

    constructor(private _wizardService: WizardService) {}

    statusChanged(stepNumber: number, event: WizardStepStatus): void {
        if (event === 'current') {
            this.goToStep(stepNumber);
        }
    }

    goToStep(step: number): void {
        switch (step) {
            case 1: {
                this.step1status = 'current';
                this.step2status = 'upcoming';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                this.step4status = 'upcoming';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 4: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'current';
                this.summaryStatus = 'upcoming';
                break;
            }
            case 5: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'completed';
                this.summaryStatus = 'current';
                break;
            }
        }
    }

    /**
     * documentation related function
     * opens the example in full screen
     */
    enterFullscreenExample(): void {
        this.goToStep(1);
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
