import { Component, signal } from '@angular/core';
import { Label, Title } from '@fundamental-ngx/ui5-webcomponents';
import { MovePlacement } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { Tree } from '@fundamental-ngx/ui5-webcomponents/tree';
import { TreeItem } from '@fundamental-ngx/ui5-webcomponents/tree-item';

@Component({
    selector: 'ui5-tree-drag-and-drop-sample',
    templateUrl: './drag-and-drop.html',
    standalone: true,
    imports: [Tree, TreeItem, Title, Label]
})
export class TreeDragAndDropSample {
    logMessage = signal<string>('');

    onMoveOver(event: any): void {
        const { destination, source } = event.detail;

        if (destination.placement === 'Before' || destination.placement === 'After') {
            event.preventDefault();
        }

        if (destination.placement === 'On' && 'allowsNesting' in destination.element.dataset) {
            event.preventDefault();
        }

        console.log(
            `Moving "${source.element.text}" ${destination.placement.toLowerCase()} "${destination.element.text}"`
        );
    }

    onMove(event: any): void {
        const { destination, source } = event.detail;

        switch (destination.placement) {
            case MovePlacement.Before:
                destination.element.before(source.element);
                break;
            case MovePlacement.After:
                destination.element.after(source.element);
                break;
            case MovePlacement.On:
                destination.element.prepend(source.element);
                break;
        }
    }
}
