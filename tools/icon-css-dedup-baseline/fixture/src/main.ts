import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(
            [
                {
                    path: 'lazy',
                    loadComponent: () => import('./app/lazy-icons.component').then((m) => m.LazyIconsComponent)
                }
            ],
            withHashLocation()
        )
    ]
}).catch((error) => console.error(error));
