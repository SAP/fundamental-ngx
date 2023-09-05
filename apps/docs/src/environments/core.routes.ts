// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/core';

ROUTES[0].path = 'core';
ROUTES.push({
    path: '**',
    redirectTo: 'core'
});

export { ROUTES };
