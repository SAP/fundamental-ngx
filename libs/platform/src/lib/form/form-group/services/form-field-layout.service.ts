import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ColumnLayout } from '@fundamental-ngx/platform/shared';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { normalizeColumnLayout } from '../helpers';

type Layouts = {
    labelColumnLayout: ColumnLayout;
    fieldColumnLayout: ColumnLayout;
    gapColumnLayout: ColumnLayout;
};

@Injectable()
export class FormFieldLayoutService {
    readonly needsInlineHelpPlace: Observable<boolean>;
    private _needsInlineHelpPlace$ = new ReplaySubject<boolean>(1);
    private _elementsMap: Map<Record<string, any>, boolean> = new Map();
    private _needsInlineHelpPlace = false;

    constructor() {
        this.needsInlineHelpPlace = this._needsInlineHelpPlace$.pipe(startWith(false), distinctUntilChanged());
    }

    setNeedsInlineHelp(target: Record<string, any>, isNeeded: boolean): void {
        this._elementsMap.set(target, isNeeded);
        this._updateCombinedValue();
    }

    getFixedLayouts(layouts: Layouts): Layouts {
        const { fieldColumnLayout, labelColumnLayout, gapColumnLayout } = {
            fieldColumnLayout: normalizeColumnLayout({ ...layouts.fieldColumnLayout }),
            labelColumnLayout: normalizeColumnLayout({ ...layouts.labelColumnLayout }),
            gapColumnLayout: normalizeColumnLayout({ ...layouts.gapColumnLayout })
        };

        if (this._needsInlineHelpPlace) {
            Object.keys(gapColumnLayout).forEach((sizeName) => {
                if (sizeName !== 'S') {
                    if (gapColumnLayout[sizeName] === 0) {
                        gapColumnLayout[sizeName] = 1;
                    }
                    if (gapColumnLayout[sizeName] + fieldColumnLayout[sizeName] > 12) {
                        const diff = gapColumnLayout[sizeName] + fieldColumnLayout[sizeName] - 12;
                        fieldColumnLayout[sizeName] -= diff;
                    }
                }
            });
        }
        return { fieldColumnLayout, labelColumnLayout, gapColumnLayout };
    }

    removeEntry(target: Record<string, any>): void {
        this._elementsMap.delete(target);
        this._updateCombinedValue();
    }

    // private _isHorizontal({ label, field, gap }: Record<string, number>): boolean {
    //     return label + field + gap >= 12;
    // }

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
