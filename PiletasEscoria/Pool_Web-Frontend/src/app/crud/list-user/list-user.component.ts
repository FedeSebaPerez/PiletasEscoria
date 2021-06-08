import { Component, OnInit } from '@angular/core';


import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';




@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {


  private users: any;
  poolForm: FormGroup;
  private userLoged: string;
  private isLoged : boolean;
  constructor(
    private httpClient: HttpClient,
    private globals: Globals,
 
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    
    ) { }

  ngOnInit() {
    this.get_users();
  }

   addUser(){
     const activeModal = this.modalService.open(AddUserComponent);
     activeModal.result.then(r => {
       this.get_users();
     }, (reason) => {})
   }

   editUser(id: number) {
     const activeModal = this.modalService.open(EditUserComponent);
     activeModal.componentInstance.id = id;
     activeModal.result.then(r => {
       this.get_users();
     }, (reason) => {})
   }


  get_users(){
    this.httpClient.get(this.globals.baseUrl + '/Users').subscribe((res : any[])=>{
    console.log("valor de res: ",res);
    this.users = res;
    });
}

}