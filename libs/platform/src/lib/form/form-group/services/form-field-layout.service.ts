import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ColumnLayout } from '@fundamental-ngx/platform/shared';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { normalizeColumnLayout } from '../helpers';
import { GRID_COLUMNS_NUMBER as maxColumnsPerRow } from '@fundamental-ngx/core/layout-grid';
import { FDP_FORM_FIELD_HINT_LAYOUT_CONFIG, HintLayoutConfig } from '../fdp-form.tokens';

type Layouts = {
    labelColumnLayout: ColumnLayout;
    fieldColumnLayout: ColumnLayout;
    gapColumnLayout: ColumnLayout;
};

/**
 * Should be used in component level. Ideally placed on container component,
 * so that every it's child FormField can have shared information about peers'
 * need about inline help place.
 */
@Injectable()
export class FormFieldLayoutService {
    /**
     * Will notify if inline help place is needed. If any of the FormFields in group have
     * hintOptions config set the way that it might end up on 'input', then it will emit true
     */
    readonly needsInlineHelpPlace: Observable<boolean>;
    /** @hidden */
    private _needsInlineHelpPlace$ = new ReplaySubject<boolean>(1);
    /** @hidden */
    private _elementsMap: Map<Record<string, any>, boolean> = new Map();
    /** @hidden */
    private _needsInlineHelpPlace = false;

    /** @hidden */
    constructor(@Inject(FDP_FORM_FIELD_HINT_LAYOUT_CONFIG) private _hintLayoutConfig: HintLayoutConfig) {
        this.needsInlineHelpPlace = this._needsInlineHelpPlace$.pipe(startWith(false), distinctUntilChanged());
    }

    /**
     * Notify service about target component's requirement for the place for inline help
     */
    setNeedsInlineHelp(target: Record<string, any>, isNeeded: boolean): void {
        this._elementsMap.set(target, isNeeded);
        this._updateCombinedValue();
    }

    /**
     * Function will give place for hint in case it does not have it yet,
     * if combined needsInlineHelpPlace value is true
     */
    getFixedLayouts(layouts: Layouts): Layouts {
        const fieldColumnLayout = normalizeColumnLayout({ ...layouts.fieldColumnLayout });
        const labelColumnLayout = normalizeColumnLayout({ ...layouts.labelColumnLayout });
        const gapColumnLayout = normalizeColumnLayout({ ...layouts.gapColumnLayout });
        if (this._needsInlineHelpPlace) {
            this._hintLayoutConfig.hintOnInputBreakpoints.forEach((sizeName) => {
                const shouldFitInOneLine =
                    labelColumnLayout[sizeName] + fieldColumnLayout[sizeName] + gapColumnLayout[sizeName] <=
                    maxColumnsPerRow;
                if (gapColumnLayout[sizeName] < this._hintLayoutConfig.hintPlaceMinSize) {
                    gapColumnLayout[sizeName] = this._hintLayoutConfig.hintPlaceMinSize;
                }
                if (gapColumnLayout[sizeName] + fieldColumnLayout[sizeName] > maxColumnsPerRow) {
                    const diff = gapColumnLayout[sizeName] + fieldColumnLayout[sizeName] - maxColumnsPerRow;
                    fieldColumnLayout[sizeName] -= diff;
                }
                if (shouldFitInOneLine) {
                    const maxAllocatedPlaceForFieldAndLabel = maxColumnsPerRow - gapColumnLayout[sizeName];
                    while (
                        labelColumnLayout[sizeName] + fieldColumnLayout[sizeName] >
                        maxAllocatedPlaceForFieldAndLabel
                    ) {
                        fieldColumnLayout[sizeName] -= 1;
                    }
                }
            });
        }
        return { fieldColumnLayout, labelColumnLayout, gapColumnLayout };
    }

    /**
     * Remove component from the combined value calculations
     */
    removeEntry(target: Record<string, any>): void {
        this._elementsMap.delete(target);
        this._updateCombinedValue();
    }

    /**
     * Will loop through all registered components and if any of them has need for
     * inline help place, then it will notify listeners about it and also will set
     * local variable
     * @hidden
     */
    private _updateCombinedValue(): void {
        for (const [, needed] of this._elementsMap) {
            if (needed) {
                this._needsInlineHelpPlace = true;
                return this._needsInlineHelpPlace$.next(true);
            }
        }
        this._needsInlineHelpPlace$.next(false);
        this._needsInlineHelpPlace = false;
    }
}
