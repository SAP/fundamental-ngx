import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
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
    template: ` <ng-content></ng-content>`,
    host: {
        class: 'fd-action-bar'
    },
    styleUrl: './action-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent {}
