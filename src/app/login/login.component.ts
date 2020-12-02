import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form:FormGroup;
submitted=false;
userId:number;
token:string;
  constructor(
    private fb: FormBuilder,
    private route:Router,
    private login_service: LoginService
    ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid && this.submitted){
      return;
    }
    console.log(this.form.value);
    this.login_service.saveUser(this.form.value.username,this.form.value.password).subscribe(res =>{
      this.userId = res.id;
      this.token = res.token;
      sessionStorage.setItem('token',this.token);
      console.log(this.userId ,this.token );
      this.route.navigateByUrl(`dashboard/${this.userId}`);
      this.form.reset();
      alert('Login Successfull');
    })
  }
  reset(){
    this.form.reset();
  }
}
