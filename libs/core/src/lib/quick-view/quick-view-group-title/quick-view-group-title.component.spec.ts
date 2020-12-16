import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { QuickViewModule } from '../quick-view.module';
import { QuickViewGroupTitleComponent } from './quick-view-group-title.component';

@Component({
    template: `
        <fd-quick-view-group-title>
            {{ title }}
        </fd-quick-view-group-title>
    `
})
class TestComponent {
    title = 'Contact Details';
}

describe('QuickViewGroupTitleComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [QuickViewModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign classes to h5 tag', () => {
        const h5 = fixture.debugElement.query(By.css('h5[fd-title]'));

        expect(h5.nativeElement.classList).toContain('fd-title');
        expect(h5.nativeElement.classList).toContain('fd-title--h5');
    });
});
