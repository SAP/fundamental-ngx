import { Component, ViewChild, ElementRef } from '@angular/core';
import { ComboBoxComponent } from '@fundamental-ngx/platform';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';


@Component({
    selector: 'fdp-test-combo-box',
    template: `
        <fdp-combo-box [dataSource]="addressDataSource" displayKey="toString" placeholder="select from here"></fdp-combo-box>
    `
})
class TestWrapperComboBoxComponent {

    @ViewChild(ComboBoxComponent, { static: true })
    selectRef: ComboBoxComponent;

    @ViewChild(ComboBoxComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    wrapperValue: string;
}
describe('ComboBoxComponent', () => {
    let component: ComboBoxComponent;
    let fixture: ComponentFixture<ComboBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComboBoxComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
