import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMobileListComponent } from './select-mobile-list.component';
import { ListModule, SelectComponent } from '@fundamental-ngx/core';

describe('OptionListComponent', () => {
    let component: SelectMobileListComponent;
    let fixture: ComponentFixture<SelectMobileListComponent>;

    const selectComponent: Partial<SelectComponent> = {
        compact: true,
        state: 'warning',
        stateMessage: 'Example state message'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectMobileListComponent],
            imports: [ListModule]
        }).overrideComponent(SelectMobileListComponent, {
            add: {providers: [{provide: SelectComponent, useValue: selectComponent}]}
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectMobileListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be compact', () => {
        expect(fixture.nativeElement.querySelector('ul').getAttribute('ng-reflect-compact')).toEqual('true');
    });

    it('should have message', () => {
        expect(
            fixture.nativeElement
                .querySelector('[fd-list-message]')
        ).toBeTruthy();

        expect(
            fixture.nativeElement
                .querySelector('ul')
                .getAttribute('ng-reflect-has-message')
        ).toEqual('true');

        expect(
            fixture.nativeElement
                .querySelector('[fd-list-message]')
                .textContent
        ).toContain(selectComponent.stateMessage);
    });

    it('should have proper message type', () => {
        expect(
            fixture.nativeElement
                .querySelector('[fd-list-message]')
                .getAttribute('ng-reflect-type')
        ).toEqual(selectComponent.state);
    });
});
