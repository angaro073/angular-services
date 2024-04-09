import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { User } from './user';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'User 1', username: 'user1', email: 'user1@example.com', 
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, 
      phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } },
      
      { id: 2, name: 'User 2', username: 'user2', email: 'user2@example.com', 
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
      phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }
    ];

    userService.getAll.and.returnValue(of(mockUsers));

    fixture.detectChanges();

    expect(userService.getAll).toHaveBeenCalled();
    expect(component['users']).toEqual(mockUsers);
  });

  it('should handle error when loading users', () => {
    const errorMessage = 'Error loading users';
    const errorResponse = { status: 500, error: { error: errorMessage } };

    userService.getAll.and.returnValue(throwError(errorResponse));

    spyOn(console, 'log');

    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(`ERROR(${errorResponse.status}): ${errorResponse.error.error}`);
  });
});
