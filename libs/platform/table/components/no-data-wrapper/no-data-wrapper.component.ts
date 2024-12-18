import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-table-no-data-wrapper',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styles: `
        fdp-table-no-data-wrapper {
            display: block;
            width: 100%;
        }
    `,
    standalone: true
})
export class NoDataWrapperComponent {}
