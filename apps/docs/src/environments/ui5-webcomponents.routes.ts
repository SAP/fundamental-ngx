import ROUTES from '@fundamental-ngx/docs/ui5-webcomponents';

ROUTES[0].path = 'ui5-webcomponents';
ROUTES.push({
    path: '**',
    redirectTo: 'ui5-webcomponents'
});

export { ROUTES };
