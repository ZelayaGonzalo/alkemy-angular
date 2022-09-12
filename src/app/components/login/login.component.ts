import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { User } from 'src/app/models/AuthModels';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('swalError')
  public readonly swalError!: SwalComponent;

  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,]]
  })

  isLoading = false

  constructor(private fb: FormBuilder,
    private auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }

  onSubmit(){
  this.isLoading = true
   let user = new User(this.email?.value,this.password?.value)
   this.auth.login(user).subscribe(
    {
      next:data=>{
        this.auth.setToken(data.token)
        window.location.href='/'
        
      },
      error:err=>{
        this.swalError.fire()
        this.swalError.text = "Invalid user or password"
        this.isLoading = false
      }
    }
   )
  }

}
