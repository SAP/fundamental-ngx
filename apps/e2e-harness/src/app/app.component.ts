import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'e2e-root',
    template: `<main><router-outlet></router-outlet></main>`,
    imports: [RouterOutlet]
})
export class AppComponent {}
