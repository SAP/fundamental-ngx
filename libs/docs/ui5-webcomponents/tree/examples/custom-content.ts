import { Component } from '@angular/core';
import { Button, Option, Select, Title, TreeItemCustom } from '@fundamental-ngx/ui5-webcomponents';
import { Tree } from '@fundamental-ngx/ui5-webcomponents/tree';

@Component({
    selector: 'ui5-tree-custom-content-sample',
    templateUrl: './custom-content.html',
    standalone: true,
    imports: [Tree, Title, TreeItemCustom, Button, Option, Select]
})
export class TreeCustomContentSample {}
