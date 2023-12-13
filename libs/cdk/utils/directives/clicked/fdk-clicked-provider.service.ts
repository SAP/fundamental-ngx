import { ElementRef, Inject, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ClickedEventPlugin } from './clicked-event.plugin';
import { ClickedDirective } from './clicked.directive';

@Injectable()
export class FdkClickedProvider extends Subject<MouseEvent | KeyboardEvent> implements OnDestroy {
    /** @ignore */
    private _preventDefault = true;
    /** @ignore */
    private _listeners!: Array<() => void>;
    /** @ignore */
    private readonly _fdkClickedEventManagerPluginLoaded: boolean;

    /** @ignore */
    constructor(
        private _elementRef: ElementRef<Element>,
        private _renderer: Renderer2,
        @Inject(EVENT_MANAGER_PLUGINS) private eventManagerPlugins: any[]
    ) {
        super();
        this._fdkClickedEventManagerPluginLoaded = eventManagerPlugins.some((em) => em instanceof ClickedEventPlugin);
        this._initialize();
    }

    /** @ignore */
    setPreventDefault(val: boolean): void {
        this._preventDefault = val;
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._listeners.forEach((d) => d());
        this.complete();
    }

    /** @ignore */
    private _initialize(): void {
        const eventsList: string[] = this._fdkClickedEventManagerPluginLoaded
            ? [ClickedDirective.eventName]
            : ['click', 'keydown.enter', 'keydown.space'];
        this._listeners = eventsList.map((eventName) =>
            this._renderer.listen(this._elementRef.nativeElement, eventName, (event: MouseEvent | KeyboardEvent) => {
                if (this._preventDefault) {
                    event.preventDefault();
                }
                this.next(event);
            })
        );
    }
}
