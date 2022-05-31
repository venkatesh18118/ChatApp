import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorbotComponent } from './mentorbot.component';

describe('MentorbotComponent', () => {
  let component: MentorbotComponent;
  let fixture: ComponentFixture<MentorbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
