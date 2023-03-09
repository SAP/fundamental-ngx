import { Injectable, OnDestroy, inject } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    BehaviorSubject,
    Observable,
    Subject,
    combineLatest,
    delay,
    filter,
    map,
    switchMap,
    take,
    takeUntil,
    tap
} from 'rxjs';
import { SettingsModel } from './models/settings.model';
import { DynamicFormValue, FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import { MessagePopoverFormWrapperComponent } from '@fundamental-ngx/platform/message-popover';
import { set } from 'lodash-es';

export type SettingsGeneratorReturnValue = Record<string, unknown>;

@Injectable()
export class SettingsGeneratorService implements OnDestroy {
    /**
     * Settings object subject.
     */
    settings = new BehaviorSubject<Nullable<SettingsModel>>(null);

    /** Form generators collected from all items and groups. */
    formGenerators = new Map<string, FormGeneratorComponent>();

    /** @hidden */
    private readonly _messagePopover = inject(MessagePopoverFormWrapperComponent, {
        optional: true
    });

    /** @hidden */
    private readonly _destroy$ = new Subject<void>();

    /**
     *
     * @param path
     * @param formGenerator
     */
    addFormGenerator(path: string[], formGenerator: FormGeneratorComponent): void {
        const joinedPath = path.join('.');
        this.formGenerators.set(joinedPath, formGenerator);
        formGenerator.loading$
            .pipe(
                filter((loading) => !loading),
                take(1),
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this._messagePopover?.addForms(formGenerator.formGroup);
                this._messagePopover?.addFormFields(formGenerator.formFields);
            });
    }

    /**
     *
     * @param path
     */
    removeFormGenerator(path: string[]): void {
        const joinedPath = path.join('.');
        this.formGenerators.delete(joinedPath);
    }

    /** @hidden */
    submit(): Observable<SettingsGeneratorReturnValue> {
        // Flatten
        const joinedEvents: Record<string, Observable<DynamicFormValue>> = {};
        this.formGenerators.forEach((formGenerator, key) => {
            joinedEvents[key] = formGenerator.loading$.pipe(
                filter((result) => !result),
                delay(50),
                tap(() => formGenerator.submit()),
                switchMap(() => formGenerator.formSubmittedStatus$),
                // take(1),
                filter((status) => status.success),
                take(1),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                map((result) => result.value!),
                takeUntil(this._destroy$)
            );
        });

        return combineLatest(joinedEvents).pipe(
            map((result) => Object.entries(result).reduce((a, b) => set(a, b[0], b[1]), {})),
            take(1),
            takeUntil(this._destroy$)
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.formGenerators.clear();
        this._destroy$.next();
        this._destroy$.complete();
    }
}
