/* eslint-disable @nx/enforce-module-boundaries */
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'button/types',
        loadComponent: () =>
            import('../../../../libs/docs/core/button/examples/button-types-example.component').then(
                (m) => m.ButtonTypesExampleComponent
            )
    },
    {
        path: 'combobox/basic',
        loadComponent: () =>
            import('../../../../libs/docs/core/combobox/examples/combobox-example.component').then(
                (m) => m.ComboboxExampleComponent
            )
    },
    {
        path: 'form-container/basic',
        loadComponent: () =>
            import(
                '../../../../libs/docs/platform/form-container/examples/platform-form-basic/platform-form-basic-example.component'
            ).then((m) => m.PlatformFormBasicExampleComponent)
    }
];
