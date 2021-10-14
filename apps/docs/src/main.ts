import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

const hmrBootstrap = (module: any, hBootstrap: () => Promise<NgModuleRef<any>>) => {
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    hBootstrap().then((mod) => (ngModule = mod));
    module.hot.dispose(() => {
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const elements = appRef.components.map((c) => c.location.nativeElement);
        const makeVisible = createNewHosts(elements);
        ngModule.destroy();
        makeVisible();
    });
};

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
    if (module['hot']) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server...');
    }
} else {
    bootstrap();
}
