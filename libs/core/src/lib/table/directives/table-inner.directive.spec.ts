import { TableInnerDirective } from './table-inner.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

    beforeEach(waitForAsync(() => {
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
