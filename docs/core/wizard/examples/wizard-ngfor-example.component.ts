import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { WizardService, WizardStepComponent, WizardStepStatus } from '@fundamental-ngx/core/wizard';

export type WizardStep = {
    status: WizardStepStatus;
    label: string;
    glyph: string;
    messageStrip: string;
    contentText: string;
};

@Component({
    selector: 'fd-wizard-ngfor-example',
    templateUrl: './wizard-ngfor-example.component.html',
    styleUrls: ['./wizard-ngfor-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardNgForExampleComponent {
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

    name = '';

    steps: WizardStep[] = [
        {
            status: 'current',
            label: 'Product Type',
            glyph: 'product',
            messageStrip:
                'The Wizard control is supposed to break down large tasks, into smaller steps, easier for the user to work with.',
            contentText:
                'Sed fermentum, mi et tristique ullamcorper, sapien sapien faucibus sem, quis pretium nibh lorem'
        },
        {
            status: 'upcoming',
            label: 'Customer Information',
            glyph: 'user-edit',
            messageStrip: 'This is the second step of this particular wizard example.',
            contentText: 'Cras tellus leo, volutpat vitae ullamcorper eu, posuere malesuada nisl.'
        },
        {
            status: 'upcoming',
            label: 'Additional Information',
            glyph: 'paid-leave',
            messageStrip: 'This wizard uses ngFor to iterate over an array to build steps',
            contentText: 'Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar.'
        }
    ];

    /** @hidden */
    @ViewChildren(WizardStepComponent)
    wizardStepComponents: QueryList<WizardStepComponent>;

    constructor(private _wizardService: WizardService) {}

    statusChanged(stepNumber: number, event: WizardStepStatus): void {
        if (event === 'current') {
            this.goToStep(stepNumber);
        }
    }

    goToStep(step: number): void {
        switch (step) {
            case 1: {
                this.steps[0].status = 'current';
                this.steps[1].status = 'upcoming';
                this.steps[2].status = 'upcoming';
                break;
            }
            case 2: {
                this.steps[0].status = 'completed';
                this.steps[1].status = 'current';
                this.steps[2].status = 'upcoming';
                break;
            }
            case 3: {
                this.steps[0].status = 'completed';
                this.steps[1].status = 'completed';
                this.steps[2].status = 'current';
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

    // Handle focus on key press first example
    /** @hidden */
    handleFocus(event: KeyboardEvent, index: number): void {
        this._wizardService.progressBarKeyHandler(event, this.wizardStepComponents, index);
    }
}
