import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fd-product-menu',
    templateUrl: './product-menu.component.html'
})
export class ProductMenuComponent implements OnInit {

    @Input()
    control: string;

    @Input()
    items: any[];

    productMenuCollapsed: boolean = false;

    @HostListener('window:resize', [])
    onResize() {
        const mq = window.matchMedia('(max-width: 601px)');
        mq.matches ? this.productMenuCollapsed = true : this.productMenuCollapsed = false;
    }

    ngOnInit() {
        this.onResize();
    }

}
