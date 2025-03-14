import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-settings]',
    template: ` <ng-content></ng-content>`,
    host: {
        class: 'fd-settings'
    },
    styleUrl: './settings.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class SettingsComponent {}
