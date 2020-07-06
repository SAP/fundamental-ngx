import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TimeObject } from './time-object';

import { TimeComponent } from './time.component';
import { ButtonModule } from '../button/button.module';
import { PipeModule } from '../utils/pipes/pipe.module';

describe('TimeComponent', () => {
    let component: TimeComponent;
    let fixture: ComponentFixture<TimeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ButtonModule, PipeModule],
            declarations: [TimeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const time: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = time;
        expect(component).toBeTruthy();
    });
});
