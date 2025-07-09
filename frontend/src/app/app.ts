import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'School Management System';
  protected isLoading = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => 
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
    ).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });
  }
}
