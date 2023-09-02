// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/platform';

ROUTES[0].path = 'platform';
ROUTES.push({
    path: '**',
    redirectTo: 'platform'
});

export { ROUTES };
