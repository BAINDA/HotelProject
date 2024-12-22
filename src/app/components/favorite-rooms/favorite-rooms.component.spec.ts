import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRoomsComponent } from './favorite-rooms.component';

describe('FavoriteRoomsComponent', () => {
  let component: FavoriteRoomsComponent;
  let fixture: ComponentFixture<FavoriteRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteRoomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
