import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  router: Router) { }

  userID!: string|null;

  ngOnInit(): void {
  }

  userHomeRedirect(userId: string){
    // console.log("go to userHome", userId);
    this.router.navigate([`/user/${userId}`])
  }

}
