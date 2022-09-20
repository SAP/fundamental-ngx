import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * The parent action bar directive.
 *
 * Children usage:
 * ```html
 * <div fd-action-bar-actions>
 * <div fd-action-bar-back>
 * <div fd-action-bar-description>
 * <div fd-action-bar-header>
 * <div fd-action-bar-mobile>
 * <div fd-action-bar-title>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-action-bar]',
    templateUrl: './action-bar.component.html',
    host: {
        class: 'fd-action-bar'
    },
    styleUrls: ['./action-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent {}
