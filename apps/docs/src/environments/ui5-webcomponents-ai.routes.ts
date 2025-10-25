// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/ui5-webcomponents-ai';

ROUTES[0].path = 'ui5-webcomponents-ai';
ROUTES.push({
    path: '**',
    redirectTo: 'ui5-webcomponents-ai'
});

export { ROUTES };
