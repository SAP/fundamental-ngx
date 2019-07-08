import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar2HeaderComponent } from './calendar2-header.component';

describe('Calendar2HeaderComponent', () => {
    let component: Calendar2HeaderComponent;
    let fixture: ComponentFixture<Calendar2HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Calendar2HeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Calendar2HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
