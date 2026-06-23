import { Component } from '@angular/core';
import { HeroBanner } from '@fundamental-ngx/ui5-webcomponents-fiori/hero-banner';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { CardHeader } from '@fundamental-ngx/ui5-webcomponents/card-header';

@Component({
    selector: 'ui5-doc-hero-banner-actions-placement-sample',
    templateUrl: './actions-placement-sample.html',
    imports: [HeroBanner, Button, Card, CardHeader]
})
export class ActionsPlacementSample {}
