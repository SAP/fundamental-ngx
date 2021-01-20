import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-wizard-ngfor-example',
    templateUrl: './wizard-ngfor-example.component.html',
    styleUrls: ['./wizard-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-wizard-example'
    }
})
export class WizardNgForExampleComponent {

    name = '';

    steps = [
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
            messageStrip:
                'This is the second step of this particular wizard example.',
            contentText:
                'Cras tellus leo, volutpat vitae ullamcorper eu, posuere malesuada nisl.'
        },
        {
            status: 'upcoming',
            label: 'Additional Information',
            glyph: 'paid-leave',
            messageStrip:
                'This wizard uses ngFor to iterate over an array to build steps',
            contentText:
                'Integer pellentesque leo sit amet dui vehicula, quis ullamcorper est pulvinar.'
        }
    ];

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
}
