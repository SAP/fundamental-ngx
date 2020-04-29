import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TileModule } from '../tile.module';
import { ProductTileTitleDirective } from './product-tile-title.directive';

@Component({
    template: ` <h2 #directiveElement fd-product-tile-title>Product Tile Title Test</h2> `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('ProductTileTitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TileModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-product-tile__title');
    });
});
