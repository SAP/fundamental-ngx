import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TileModule } from '../tile.module';
import { ProductTileTitleComponent } from './product-tile-title.component';

@Component({
    template: `
        <h2 #componentElement fd-product-tile-title>Product Tile Title Test</h2>
    `
})
class TestComponent {
    @ViewChild('componentElement')
    ref: ElementRef;
}

describe('ProductTileTitleComponent', () => {
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
