import { Injectable, OnDestroy, inject, ElementRef } from '@angular/core';
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
     * Settings configuration subject.
     */
    readonly settings = new BehaviorSubject<Nullable<SettingsModel>>(null);

    /**
     * Stream emitted when user clicked on message popover error entry.
     */
    readonly onItemFocus = new Subject<{ path: string; element: ElementRef<HTMLElement> }>();

    /**
     * Stream emitted when mobile state has been changed.
     */
    readonly mobileState$ = new BehaviorSubject<boolean>(false);

    /**
     * @hidden
     * Form generators collected from all items and groups.
     */
    private readonly _formGenerators = new Map<string, FormGeneratorComponent>();

    /** @hidden */
    private readonly _messagePopover = inject(MessagePopoverFormWrapperComponent, {
        optional: true
    });

    /** @hidden */
    private readonly _destroy$ = new Subject<void>();

    /** @hidden */
    constructor() {
        this._listenToMessagePopoverItemClick();
    }

    /** @hidden */
    _addFormGenerator(path: string[], formGenerator: FormGeneratorComponent): void {
        const joinedPath = path.join('.');
        this._formGenerators.set(joinedPath, formGenerator);
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

    /** @hidden */
    _removeFormGenerator(path: string[]): void {
        const joinedPath = path.join('.');
        this._formGenerators.delete(joinedPath);
    }

    /**
     * Submits registered forms and emits result if submission status was successful (no errors).
     */
    submit(): Observable<SettingsGeneratorReturnValue> {
        const joinedEvents: Record<string, Observable<DynamicFormValue>> = {};
        this._formGenerators.forEach((formGenerator, key) => {
            joinedEvents[key] = formGenerator.loading$.pipe(
                filter((result) => !result),
                delay(50),
                tap(() => formGenerator.submit()),
                switchMap(() => formGenerator.formSubmittedStatus$),
                filter((status) => status.success),
                take(1),
                map((result) => result.value as DynamicFormValue),
                takeUntil(this._destroy$)
            );
        });

        return combineLatest(joinedEvents).pipe(
            map((result) => Object.entries(result).reduce((a, b) => set(a, b[0], b[1]), {})),
            take(1),
            takeUntil(this._destroy$)
        );
    }

    /**
     * Sets mobile state.
     * @param isMobile Whether mobile state should be applied.
     */
    setMobileState(isMobile: boolean): void {
        this.mobileState$.next(isMobile);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._formGenerators.clear();
        this._destroy$.next();
        this._destroy$.complete();
    }

    /**
     * @hidden
     * Subscribse to click events from message popover and tries to open the section where invalid input is located.
     */
    private _listenToMessagePopoverItemClick(): void {
        this._messagePopover?.messagePopover$
            ?.pipe(
                switchMap((messagePopover) => messagePopover.focusItem),
                filter((entry) => !!entry.formField),
                takeUntil(this._destroy$)
            )
            .subscribe((entry) => {
                this._formGenerators.forEach((formGenerator, path) => {
                    const formFields = formGenerator.formFields;
                    // We already filtered entries with present form field.
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    if (formFields.includes(entry.formField!)) {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        this.onItemFocus.next({ path, element: entry.formField!.elementRef });
                        return false;
                    }
                });
                console.log(entry, this._formGenerators);
            });
    }
}
