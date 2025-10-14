// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/ui5-webcomponents-fiori';

ROUTES[0].path = 'ui5-webcomponents-fiori';
ROUTES.push({
    path: '**',
    redirectTo: 'ui5-webcomponents-fiori'
});

export { ROUTES };
