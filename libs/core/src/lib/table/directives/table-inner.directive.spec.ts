import { TableInnerDirective } from './table-inner.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from '../table.module';

@Component({
    template: ` <div #tableInnerElement fd-table-inner>Content</div> `
})
class TestComponent {
    @ViewChild('tableInnerElement')
    ref: ElementRef;
}

describe('TableInnerDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TableModule]
        }).compileComponents();
    }));

    beforeEach(async() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-table__inner');
    });
});
