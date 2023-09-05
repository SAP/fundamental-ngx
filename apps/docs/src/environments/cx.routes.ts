// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/cx';

ROUTES[0].path = 'cx';
ROUTES.push({
    path: '**',
    redirectTo: 'cx'
});

export { ROUTES };
