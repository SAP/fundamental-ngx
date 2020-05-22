import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MicroAppMain } from './microapp.main';
import { MicroFrontendsRouterSinkComponent } from './microfrontends.router.sink.component';
import { MicroFrontendsWrapperComponent } from './microfrontends.wrapper.component';


@NgModule({
  declarations: [MicroAppMain, MicroFrontendsRouterSinkComponent, MicroFrontendsWrapperComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [MicroAppMain, MicroFrontendsRouterSinkComponent, MicroFrontendsWrapperComponent]
})

export class PlatformMicroFrontendsModule { }
