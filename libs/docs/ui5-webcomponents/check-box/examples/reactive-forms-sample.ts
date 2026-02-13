import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ui5-checkbox-reactive-forms-sample',
    templateUrl: './reactive-forms-sample.html',
    imports: [FormsModule, ReactiveFormsModule, CheckBox, JsonPipe]
})
export class ReactiveFormsSample implements OnInit {
    readonly registrationForm = new FormGroup({
        acceptAll: new FormControl(false),
        agreements: new FormGroup({
            marketing: new FormControl<boolean | undefined>(undefined),
            newsletter: new FormControl(false),
            termsAndConditions: new FormControl(false)
        })
    });

    private readonly _destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.setAgreementsOnAcceptAllChange();
        this.setControlOnAgreementsChange();
    }

    private acceptAll(accept: boolean | null): void {
        this.registrationForm.get('agreements')?.setValue({
            marketing: accept,
            newsletter: accept,
            termsAndConditions: accept
        });
    }

    private setAgreementsOnAcceptAllChange(): void {
        this.registrationForm
            .get('acceptAll')
            ?.valueChanges.pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((value) => this.acceptAll(value));
    }

    private setControlOnAgreementsChange(): void {
        this.registrationForm
            .get('agreements')
            ?.valueChanges.pipe(
                map((agreements) => this.getValuesFromObject(agreements)),
                map((agreementsValues: boolean[]) => {
                    const agreeAll = agreementsValues.reduce((overall, value) => value && overall, true);
                    const declineAll = agreementsValues.reduce((overall, value) => !value && overall, true);
                    if (agreeAll) {
                        return true;
                    } else if (declineAll) {
                        return false;
                    } else {
                        return null;
                    }
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((acceptAllValue) =>
                this.registrationForm.get('acceptAll')?.setValue(acceptAllValue, { emitEvent: false })
            );
    }

    private getValuesFromObject(obj: Record<string, any>): any[] {
        return Object.keys(obj).map((e) => obj[e]);
    }
}
