import { Signal, computed, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Enumeration of reasons why a dialog was dismissed.
 * Used to identify the cause of dialog closure without explicit user action.
 */
export enum FD_DIALOG_DISMISS_REASON {
    /** Dialog dismissed by pressing the Escape key */
    ESCAPE = 'escape',
    /** Dialog dismissed by clicking on the backdrop/overlay */
    BACKDROP = 'backdrop',
    /** Dialog dismissed due to router navigation */
    NAVIGATION_CHANGE = 'navigation change',
    /** Dialog dismissed because the service was destroyed */
    SERVICE_DESTROYED = 'service destroyed'
}

/**
 * Represents the current lifecycle status of a dialog.
 * - `pending`: Dialog created but not yet loaded/initialized
 * - `loaded`: Dialog view has been loaded and initialized
 * - `closed`: Dialog closed normally with a result
 * - `dismissed`: Dialog dismissed without a result (via ESC, backdrop click, etc.)
 */
export type DialogStatus = 'pending' | 'loaded' | 'closed' | 'dismissed';

/**
 * Result object returned when a dialog is closed or dismissed.
 * Contains the final status and any associated data or reason.
 * @template P - The type of result value returned when dialog is closed
 */
export interface DialogCloseResult<P> {
    /** Whether the dialog was closed normally or dismissed */
    status: 'closed' | 'dismissed';
    /** Optional result value when dialog was closed normally */
    value?: P;
    /** Optional reason when dialog was dismissed */
    reason?: FD_DIALOG_DISMISS_REASON | any;
}
export class DialogRefBase<T, P = any> {
    /**
     * Data passed from the calling component to the dialog content.
     * Accessible within the dialog component via the DialogRef instance.
     */
    public data: T;

    /**
     * Observable that emits when the dialog is closed.
     * Emits the result value on normal close, or errors with the dismiss reason.
     * @deprecated Use signal-based API instead: `status()`, `closeResult()`, or `isOpen()`
     */
    public afterClosed: Observable<P | undefined>;

    /**
     * Observable that emits when the dialog view is initialized and loaded.
     * @deprecated Use signal-based API instead: `isLoaded()`
     */
    public afterLoaded: Observable<boolean>;

    /**
     * Readonly signal containing the current lifecycle status of the dialog.
     * Possible values: 'pending', 'loaded', 'closed', 'dismissed'
     */
    readonly status: Signal<DialogStatus>;

    /**
     * Readonly signal containing the result of dialog closure.
     * Returns null while dialog is open, contains result object after close/dismiss.
     */
    readonly closeResult: Signal<DialogCloseResult<P> | null>;

    /**
     * Computed signal indicating whether the dialog has been loaded and initialized.
     * Returns true once the dialog view has finished loading.
     */
    readonly isLoaded = computed(() => this.status() !== 'pending');

    /**
     * Computed signal indicating whether the dialog has been closed or dismissed.
     * Returns true if status is 'closed' or 'dismissed'.
     */
    readonly isClosed = computed(() => {
        const status = this.status();
        return status === 'closed' || status === 'dismissed';
    });

    /**
     * Computed signal indicating whether the dialog is currently open and active.
     * Returns true if dialog is loaded but not yet closed/dismissed.
     */
    readonly isOpen = computed(() => this.isLoaded() && !this.isClosed());

    /**
     * @hidden
     * Subject that signals the end of dialog lifecycle.
     * Completes when dialog is closed or dismissed.
     * Used by dialog container components to track lifecycle.
     */
    public _endClose$ = new Subject<void>();

    /**
     * @hidden
     * Internal subject for backward-compatible afterClosed observable.
     */
    protected readonly afterClosedSubject = new Subject<P | undefined>();

    /**
     * @hidden
     * Internal subject for backward-compatible afterLoaded observable.
     */
    protected readonly afterLoadedSubject = new Subject<boolean>();

    /** @hidden Internal signal tracking dialog lifecycle status */
    private readonly _statusSignal = signal<DialogStatus>('pending');

    /** @hidden Internal signal storing the result of dialog closure */
    private readonly _closeResultSignal = signal<DialogCloseResult<P> | null>(null);

    /** @hidden */
    constructor() {
        // Initialize readonly signals from private signals
        this.status = this._statusSignal.asReadonly();
        this.closeResult = this._closeResultSignal.asReadonly();

        // Initialize observables from protected subjects
        this.afterClosed = this.afterClosedSubject.asObservable();
        this.afterLoaded = this.afterLoadedSubject.asObservable();
    }

    /**
     * Closes the dialog normally and returns a result value.
     * Updates signal state and emits to observables for backward compatibility.
     * @param result - Optional result value to return to the caller
     */
    public close(result?: P): void {
        // Update signal state
        this._statusSignal.set('closed');
        this._closeResultSignal.set({
            status: 'closed',
            value: result
        });

        // Maintain backward compatibility with RxJS API
        this._endClose$.next();
        this._endClose$.complete();
        this.afterClosedSubject.next(result);
        this.afterClosedSubject.complete();
    }

    /**
     * Dismisses the dialog without a result, typically due to user cancellation.
     * Updates signal state and emits error to observables for backward compatibility.
     * @param reason - Optional reason for dismissal (ESC key, backdrop click, etc.)
     */
    public dismiss(reason?: FD_DIALOG_DISMISS_REASON | any): void {
        // Update signal state
        this._statusSignal.set('dismissed');
        this._closeResultSignal.set({
            status: 'dismissed',
            reason
        });

        // Maintain backward compatibility with RxJS API
        this._endClose$.next();
        this._endClose$.complete();
        this.afterClosedSubject.error(reason);
    }

    /**
     * Marks the dialog as loaded and initialized.
     * Called internally after the dialog view has been created and rendered.
     * Updates signal state and emits to observables for backward compatibility.
     * @internal
     */
    public loaded(): void {
        // Update signal state
        this._statusSignal.set('loaded');

        // Maintain backward compatibility with RxJS API
        this.afterLoadedSubject.next(true);
    }
}
