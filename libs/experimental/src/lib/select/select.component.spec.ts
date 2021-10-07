import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExperimentalSelectComponent } from './select.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

describe('SelectComponent', () => {
    let component: ExperimentalSelectComponent;
    let fixture: ComponentFixture<ExperimentalSelectComponent>;
    let changeDetectorRef: ChangeDetectorRef;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, FormsModule],
                declarations: [ExperimentalSelectComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ExperimentalSelectComponent);
        component = fixture.componentInstance;
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
