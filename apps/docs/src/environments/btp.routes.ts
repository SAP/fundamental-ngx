// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/btp';

ROUTES[0].path = 'btp';
ROUTES.push({
    path: '**',
    redirectTo: 'btp'
});

export { ROUTES };
