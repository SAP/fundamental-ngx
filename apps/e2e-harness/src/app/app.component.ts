import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'e2e-root',
    template: `@if (_bareLayout()) {
            <router-outlet></router-outlet>
        } @else {
            <main><router-outlet></router-outlet></main>
        }`,
    imports: [RouterOutlet]
})
export class AppComponent {
    protected readonly _bareLayout = signal(false);

    private readonly _router = inject(Router);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._setLayout();
        this._router.events
            .pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => this._setLayout());
    }

    private _setLayout(): void {
        let route = this._router.routerState.snapshot.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        this._bareLayout.set(route.data['bareLayout'] === true);
    }
}
