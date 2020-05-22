import { AfterViewInit, ElementRef, OnInit, Output, EventEmitter, Component, Optional } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Observable, of} from 'rxjs';
@Component({
  template: ``
})
export class MicroAppMain implements AfterViewInit, OnInit {
  /**
   * output custom event
   */
  @Output() oncustomevent = new EventEmitter();
  
  constructor(public el: ElementRef, @Optional() private router?: Router) { }

  ngOnInit() {}

  private changeRootRouteConfig(): void {
    if (this.el.nativeElement.shadowRoot) {
      const locationLinks: HTMLCollection =
        this.el.nativeElement.parentNode.children;

      for (let i = 0; i < locationLinks.length; i++) {
      if (locationLinks[i].className === '__micro_app_router_root__' 
      && locationLinks[i].getAttribute('root_path')
      && this.router) {

          const loc = locationLinks[i].getAttribute('root_path');
          this.getRouterConfig(loc).subscribe((data: Routes) => {

            this.router.resetConfig(data);

          });
          break;
        }
      }
    }
  }

  private getRouterConfig(rootpath): Observable<Routes> {
    return of(this.router.config.map(config => {
      const newConfig = Object.assign({}, config);
      newConfig.path = config.path.replace('{rootpath}', rootpath);
      if (newConfig.redirectTo)   {
        newConfig.redirectTo = config.redirectTo.replace('{rootpath}', rootpath);
      }
      return newConfig;
    }));
  }

/**
 * 
 * @param eventName name of original event for consumer to identify what's event about
 * @param data any object to be sent. 
 */
  public emitCustomEvent(eventName: string, data: object): void {
    this.oncustomevent.emit({ event: eventName, data: data });
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.shadowRoot) {

      this.changeRootRouteConfig(); 
      if (this.router) {
        this.router.initialNavigation();
      }
      const allStyleLinks: HTMLCollection = this.el.nativeElement.parentNode.children;

      for (let i = 0; i < allStyleLinks.length; i++) {
      if (allStyleLinks[i].className === '__micro_app_css_href__' 
      && allStyleLinks[i].getAttribute('css_href')) {

          const cssHref = allStyleLinks[i].getAttribute('css_href');
          const cssLink = document.createElement('link');
          cssLink.type = 'text/css';
          cssLink.rel = 'stylesheet';
          cssLink.href = cssHref;
          this.el.nativeElement.shadowRoot.appendChild(cssLink);

        }
      }
    }
  }
}

