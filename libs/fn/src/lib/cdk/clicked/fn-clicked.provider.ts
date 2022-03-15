import { ElementRef, Inject, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { ClickedEventPlugin } from './clicked-event.plugin';

@Injectable()
export class FnClickedProvider extends Subject<MouseEvent | KeyboardEvent> implements OnDestroy {
    private _preventDefault = true;
    private _listeners!: Array<() => void>;
    private readonly _fnClickedEventManagerPluginLoaded: boolean;

    constructor(
        private _elementRef: ElementRef<Element>,
        private _renderer: Renderer2,
        @Inject(EVENT_MANAGER_PLUGINS) private eventManagerPlugins: any[]
    ) {
        super();
        this._fnClickedEventManagerPluginLoaded = eventManagerPlugins.some((em) => em instanceof ClickedEventPlugin);
        this._initialize();
    }

    setPreventDefault(val: boolean): void {
        this._preventDefault = val;
    }

    ngOnDestroy(): void {
        this._listeners.forEach((d) => d());
        this.complete();
    }

    private _initialize(): void {
        const eventsList: string[] = this._fnClickedEventManagerPluginLoaded
            ? ['fnClicked']
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
