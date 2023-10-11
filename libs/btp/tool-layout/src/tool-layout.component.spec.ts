import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolLayoutComponent } from './tool-layout.component';

describe('BarComponent', () => {
    let component: ToolLayoutComponent;
    let fixture: ComponentFixture<ToolLayoutComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ToolLayoutComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
