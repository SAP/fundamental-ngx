import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

declare let hljs: any;

@Component({
  selector: 'html-example',
  templateUrl: './html-example.component.html'
})
export class HtmlExampleComponent implements AfterViewInit  {

  @Input()
  html: string;

  constructor(
    private element: ElementRef
  ) { }

  ngAfterViewInit() {
    hljs.highlightBlock(this.element.nativeElement.querySelector('.highlight'))
  }

}

