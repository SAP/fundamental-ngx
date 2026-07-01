import { Component } from '@angular/core';
import { HeroBanner } from '@fundamental-ngx/ui5-webcomponents-fiori/hero-banner';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Card } from '@fundamental-ngx/ui5-webcomponents/card';
import { CardHeader } from '@fundamental-ngx/ui5-webcomponents/card-header';
import { Title } from '@fundamental-ngx/ui5-webcomponents/title';

@Component({
    selector: 'ui5-doc-hero-banner-use-cases-sample',
    templateUrl: './use-cases-sample.html',
    imports: [HeroBanner, Button, Card, CardHeader, Title]
})
export class UseCasesSample {}
