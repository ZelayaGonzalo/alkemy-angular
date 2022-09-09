import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuthorized:boolean = false

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.isAuthorized = this.auth.isLogged()
  }
  onLogout(){
    this.auth.logOut()
  }

}
