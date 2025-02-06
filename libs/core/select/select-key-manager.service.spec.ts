import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKeyManagerService } from './select-key-manager.service';
import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';

@Component({
    template: `
        <fd-select [(value)]="value" formControlName="selectControl" (isOpenChange)="onOpen($event)">
            <li fd-option id="option-1" [value]="'value-1'">Test1</li>
            <li fd-option id="option-2" [value]="'value-2'">Test2</li>
            <li fd-option id="option-3" [value]="'value-3'">Test3</li>
            <li fd-option id="option-4" [disabled]="disabled" [value]="'value-4'">Test4</li>
        </fd-select>
    `,
    standalone: true,
    imports: [SelectModule],
    providers: [SelectKeyManagerService]
})
class SelectTestComponent {
    @ViewChild(SelectComponent, { static: true })
    selectComponent: SelectComponent;

    @ViewChild(SelectComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    value: string;

    isOpen: boolean;

    constructor(public keyService: SelectKeyManagerService) {}

    onOpen(isOpen: boolean): void {
        this.isOpen = isOpen;
    }
}

describe('SelectKeyManagerService', () => {
    let service: SelectKeyManagerService;
    let _component: SelectTestComponent;
    let fixture: ComponentFixture<SelectTestComponent>;

    const keyDownEventUp = new KeyboardEvent('keydown', {
        key: 'ArrowUp'
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SelectTestComponent],
            providers: [SelectKeyManagerService]
        }).compileComponents();

        fixture = TestBed.createComponent(SelectTestComponent);
        _component = fixture.componentInstance;
        fixture.detectChanges();
        service = _component.selectComponent._getKeyService();
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('should intialize the key manager', () => {
        service._initKeyManager();
        fixture.detectChanges();
        expect(service._keyManager).not.toBeUndefined();
    });

    it('should call _handleClosedKeydown on key press', () => {
        jest.spyOn(service, '_handleClosedKeydown');

        _component.selectComponent._handleKeydown(keyDownEventUp);

        fixture.detectChanges();

        expect(service._handleClosedKeydown).toHaveBeenCalled();
    });

    it('should call _handleOpenKeydown on key press', () => {
        jest.spyOn(service, '_handleOpenKeydown');

        _component.selectComponent._isOpen = true;

        _component.selectComponent._handleKeydown(keyDownEventUp);

        fixture.detectChanges();

        expect(service._handleOpenKeydown).toHaveBeenCalled();
    });
});
