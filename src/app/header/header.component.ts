import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs = new Subscription;
  constructor(private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

}
