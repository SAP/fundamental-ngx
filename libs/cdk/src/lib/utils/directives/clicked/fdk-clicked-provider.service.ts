import { ElementRef, Inject, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { ClickedEventPlugin } from './clicked-event.plugin';
import { ClickedDirective } from './clicked.directive';

@Injectable()
export class FdkClickedProvider extends Subject<MouseEvent | KeyboardEvent> implements OnDestroy {
    /** @hidden */
    private _preventDefault = true;
    /** @hidden */
    private _listeners!: Array<() => void>;
    /** @hidden */
    private readonly _fdkClickedEventManagerPluginLoaded: boolean;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef<Element>,
        private _renderer: Renderer2,
        @Inject(EVENT_MANAGER_PLUGINS) private eventManagerPlugins: any[]
    ) {
        super();
        this._fdkClickedEventManagerPluginLoaded = eventManagerPlugins.some((em) => em instanceof ClickedEventPlugin);
        this._initialize();
    }

    /** @hidden */
    setPreventDefault(val: boolean): void {
        this._preventDefault = val;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._listeners.forEach((d) => d());
        this.complete();
    }

    /** @hidden */
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
