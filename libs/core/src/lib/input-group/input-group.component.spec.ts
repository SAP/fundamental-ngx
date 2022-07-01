import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputGroupComponent } from './input-group.component';
import { FormsModule } from '@angular/forms';
import {
    InputGroupAddOnDirective,
    InputGroupInputDirective,
    InputGroupTextareaDirective
} from './input-group-directives';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY } from '../utils/public_api';
import { first } from 'rxjs/operators';

describe('InputGroupComponent', () => {
    let component: InputGroupComponent;
    let fixture: ComponentFixture<InputGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ButtonModule, IconModule],
            declarations: [
                InputGroupInputDirective,
                InputGroupAddOnDirective,
                InputGroupTextareaDirective,
                InputGroupComponent
            ],
            providers: [ContentDensityService]
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

    it('should get an ID and handle the close event for that ID', (done) => {
        component.addOnButtonClicked.pipe(first()).subscribe(($event) => {
            expect($event).toBeDefined();
            done();
        });
        component._buttonClicked({} as any);
    });

    it('should handle content density when compact input is not provided', () => {
        component.ngOnInit();
        expect(component.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
    });
});
