import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ViewportRootService {
    /** hidden */
    private rootNode: HTMLElement | null = null;

    /** hidden */
    public rootElement$: Subject<HTMLElement> = new Subject<HTMLElement>();

    /** hidden */
    setRootNode(node: HTMLElement): void {
        this.rootNode = node;
        this.rootElement$.next(this.rootNode);
    }

    /** hidden */
    getRootNode(): HTMLElement | null {
        return this.rootNode;
    }
}
