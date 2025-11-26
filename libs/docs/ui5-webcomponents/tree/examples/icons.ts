import { Component, signal } from '@angular/core';
import { Tree } from '@fundamental-ngx/ui5-webcomponents/tree';
import { TreeItem } from '@fundamental-ngx/ui5-webcomponents/tree-item';

// Import all icons
import '@ui5/webcomponents-icons/dist/AllIcons.js';

interface FileStructureTreeItem {
    id: number;
    text: string;
    icon: string;
    expanded?: boolean;
    children?: FileStructureTreeItem[];
    additionalText?: string;
}

@Component({
    selector: 'ui5-tree-icons-sample',
    templateUrl: './icons.html',
    standalone: true,
    imports: [Tree, TreeItem]
})
export class TreeIconsSample {
    fileStructure = signal<FileStructureTreeItem[]>([
        {
            id: 1,
            text: 'src',
            icon: 'folder-blank',
            expanded: true,
            additionalText: 'Folder containing source files',
            children: [
                {
                    id: 11,
                    text: 'components',
                    icon: 'folder-blank',
                    additionalText: 'Folder containing UI components',
                    children: [
                        { id: 111, text: 'button.ts', icon: 'document', additionalText: 'Button component' },
                        { id: 112, text: 'input.ts', icon: 'document', additionalText: 'Input component' }
                    ]
                },
                {
                    id: 12,
                    text: 'services',
                    icon: 'folder-blank',
                    children: [{ id: 121, text: 'api.service.ts', icon: 'document', additionalText: 'API service' }]
                },
                { id: 13, text: 'main.ts', icon: 'document', additionalText: 'Main entry point' }
            ]
        },
        {
            id: 2,
            text: 'assets',
            icon: 'folder-blank',
            children: [
                { id: 21, text: 'images', icon: 'folder-blank', additionalText: 'Folder containing images' },
                { id: 22, text: 'styles', icon: 'folder-blank', additionalText: 'Folder containing styles' }
            ]
        },
        {
            id: 3,
            text: 'package.json',
            icon: 'document-text'
        },
        {
            id: 4,
            text: 'README.md',
            icon: 'information'
        }
    ]);
}
