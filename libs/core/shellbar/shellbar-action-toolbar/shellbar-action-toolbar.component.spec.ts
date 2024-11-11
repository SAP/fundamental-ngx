import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellbarActionToolbarComponent } from './shellbar-action-toolbar.component';

describe('ShellbarToolbarComponent', () => {
    let component: ShellbarActionToolbarComponent;
    let fixture: ComponentFixture<ShellbarActionToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShellbarActionToolbarComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ShellbarActionToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
