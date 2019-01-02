import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopilotComponent } from './copilot.component';

describe('CopilotComponent', () => {
    let component: CopilotComponent;
    let fixture: ComponentFixture<CopilotComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CopilotComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CopilotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
