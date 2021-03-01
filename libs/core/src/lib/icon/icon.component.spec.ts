import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';

import { IconModule } from './icon.module';
import { IconComponent } from './icon.component';

const ICON_NAME = 'add';
const ICON_SIZE = 'l';

@Component({
    selector: 'fd-test-icon',
    template: ` <fd-icon [glyph]="iconName"></fd-icon> `
})
class TestWrapperComponent {
    readonly iconName = ICON_NAME;
}

describe('IconComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [IconModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Add icon class with glyph on input', () => {
        const icon = fixture.debugElement.nativeElement.querySelector('fd-icon');
        expect(icon.className).toContain('sap-icon--' + ICON_NAME);
    });
});
