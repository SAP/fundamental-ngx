// eslint-disable-next-line @nx/enforce-module-boundaries
import ROUTES from '@fundamental-ngx/docs/cdk';

ROUTES[0].path = 'cdk';
ROUTES.push({
    path: '**',
    redirectTo: 'cdk'
});

export { ROUTES };
