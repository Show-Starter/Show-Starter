import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageDialogComponent } from './custom-message-dialog.component';

describe('CustomMessageDialogComponent', () => {
  let component: CustomMessageDialogComponent;
  let fixture: ComponentFixture<CustomMessageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomMessageDialogComponent]
    });
    fixture = TestBed.createComponent(CustomMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
