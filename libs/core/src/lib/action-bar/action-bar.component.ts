import { Component, ViewEncapsulation } from '@angular/core';

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
 * <h1 fd-action-bar-title>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-action-bar]',
    template: `
        <ng-content></ng-content>`,
    host: {
        class: 'fd-action-bar'
    },
    styleUrls: ['./action-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActionBarComponent {
}
