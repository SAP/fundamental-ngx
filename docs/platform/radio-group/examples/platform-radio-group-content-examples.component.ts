import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fdp-platform-radio-group-content-example',
    templateUrl: './platform-radio-group-content-example.component.html'
})
export class PlatformRadioGroupContentExampleComponent {
    favoriteSeason = '';
    favoriteSeason2 = 'spring';
    favoriteMonth = '';
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    form1 = new FormGroup({
        radioc1: new FormControl(null)
    });

    form2 = new FormGroup({
        radioc2: new FormControl(null)
    });

    form3 = new FormGroup({
        radioc3: new FormControl('winter')
    });
    form3Data = { radioc3: 'winter' };

    form4 = new FormGroup({
        radioc4: new FormControl(null)
    });

    form5 = new FormGroup({
        month: new FormControl('february')
    });

    constructor(private readonly _messageToastService: MessageToastService) {}

    onSubmit(form: NgForm): void {
        if (this.form4.controls.radioc4.status === 'INVALID' && form.submitted) {
            this.form4.controls.radioc4.markAsTouched();
        }
    }

    onReset(): void {
        this.form4.reset();
        const content = 'Form was successfully reset.';
        this._messageToastService.open(content, {
            duration: 5000
        });
    }
}
