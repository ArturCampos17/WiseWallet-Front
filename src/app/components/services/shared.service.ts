import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userLoggedInSource = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedInSource.asObservable();

  setUserLoggedIn(status: boolean) {
    this.userLoggedInSource.next(status);
  }
}