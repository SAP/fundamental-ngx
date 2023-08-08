import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModuleRef } from '@angular/core';

import { AppModule } from './app/app.module';

const bootstrap = (): Promise<NgModuleRef<AppModule>> => platformBrowserDynamic().bootstrapModule(AppModule);
bootstrap().catch((err) => console.error(err));
