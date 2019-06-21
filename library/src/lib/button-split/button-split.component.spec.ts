import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonSplitComponent } from './button-split.component';
import { ButtonSplitModule } from './button-split.module';

describe('ButtonSplitComponent', () => {
    let component: ButtonSplitComponent;
    let fixture: ComponentFixture<ButtonSplitComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ButtonSplitModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonSplitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
