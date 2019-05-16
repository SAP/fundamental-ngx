import { Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a loading spinner. 
 *
 * ```html
 * <fd-loading-spinner [loading]="true"></fd-loading-spinner>
 * ```
 */
@Component({
    selector: 'fd-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoadingSpinnerComponent {
    /** Whether to display the loading indicator animation. */
    @Input()
    loading: boolean = false;

    /** Aria label for the 'loading' spinner. */
    @Input()
    loadingLabel: string = 'Loading';
}
