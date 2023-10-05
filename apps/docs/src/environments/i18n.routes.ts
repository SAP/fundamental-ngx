// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/i18n';

ROUTES[0].path = 'i18n';
ROUTES.push({
    path: '**',
    redirectTo: 'i18n'
});

export { ROUTES };
