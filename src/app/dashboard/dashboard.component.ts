import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId:string
  authToken:string;
  lists:any =[];
  constructor( 
    private login_service: LoginService,
    private route:ActivatedRoute
     ) { 
     }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parammap:ParamMap) =>{
      if(parammap.has('id')){
        this.userId = parammap.get('id');
        console.log('from dashboard = '+this.userId);
        this.login_service.getlist(this.userId,).subscribe(
          res =>{
            //console.log(res);
            this.lists = res.details;
            console.log(this.lists);
          }
        );
      }
    })
  }

}
