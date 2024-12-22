import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UspSectionComponent } from './usp-section.component';

describe('UspSectionComponent', () => {
  let component: UspSectionComponent;
  let fixture: ComponentFixture<UspSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UspSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UspSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
