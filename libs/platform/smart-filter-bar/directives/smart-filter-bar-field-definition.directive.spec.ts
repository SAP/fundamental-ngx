import { whenStable } from '@fundamental-ngx/core/tests';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformSmartFilterBarModule } from '../smart-filter-bar.module';
import { SmartFilterBarFieldDefinitionDirective } from './smart-filter-bar-field-definition.directive';

@Component({
    template: `<div fdp-smart-filter-bar-field-definition smartFilterBarFilterable="false" required="true"></div>`
})
class TestComponent {
    @ViewChild(SmartFilterBarFieldDefinitionDirective)
    directive: SmartFilterBarFieldDefinitionDirective;
}

describe('SmartFilterBarFieldDefinitionDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformSmartFilterBarModule],
            declarations: [TestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should convert string to boolean', async () => {
        await whenStable(fixture);
        expect(component.directive.smartFilterBarFilterable).toBe(false);
        expect(component.directive.required).toBe(true);
    });
});
