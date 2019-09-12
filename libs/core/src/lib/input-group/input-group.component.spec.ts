import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGroupComponent } from './input-group.component';
import { InputGroupModule } from '@fundamental-ngx/core';

describe('InputGroupComponent', () => {
    let component: InputGroupComponent;
    let fixture: ComponentFixture<InputGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [InputGroupModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get an ID and handle the close event for that ID', () => {
        component.addOnButtonClicked.subscribe($event => expect($event).toBeDefined());
        component.buttonClicked({});
    });
});
