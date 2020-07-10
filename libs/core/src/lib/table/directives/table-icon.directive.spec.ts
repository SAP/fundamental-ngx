import { TableIconDirective } from './table-icon.directive';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from '@fundamental-ngx/core';

@Component({
    template: `
        <span fd-table-icon [glyph]="'glyph'" [navigation]="true"></span>
    `
})
class TestComponent {
    @ViewChild(TableIconDirective)
    icon: TableIconDirective;
}

describe('TableIconDirective', () => {
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

    it('should assign classes', () => {
        expect(component.icon.elementRef().nativeElement.classList.length).toBe(3);
    });
});
