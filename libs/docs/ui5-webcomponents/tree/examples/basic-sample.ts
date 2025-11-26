import { Component } from '@angular/core';
import { Tree } from '@fundamental-ngx/ui5-webcomponents/tree';
import { TreeItem } from '@fundamental-ngx/ui5-webcomponents/tree-item';

@Component({
    selector: 'ui5-tree-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [Tree, TreeItem]
})
export class TreeBasicSample {}
