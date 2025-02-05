import { Component } from '@angular/core';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH, FdTranslatePipe } from '@fundamental-ngx/i18n';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'fd-using-translation-pipe-example',
    template: `Resolved with pipe: {{ 'coreDatePicker.dateInputLabel' | fdTranslate }}`,
    imports: [FdTranslatePipe],
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class UsingTranslationPipeExampleComponent {}
