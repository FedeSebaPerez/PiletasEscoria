import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Globals} from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';
import { AddEmailComponent } from '../add-email/add-email.component';
import { EditEmailComponent } from '../edit-email/edit-email.component';



@Component({
  selector: 'app-list-email',
  templateUrl: './list-email.component.html',
  styleUrls: ['./list-email.component.css']
})

export class ListEmailComponent implements OnInit {
  //durationInSeconds = 5;
  
  



  private emails: any; 
  private statuses = [];
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
    this.get_emails();
  }


  get_emails(){
    this.httpClient.get(this.globals.baseUrl + '/Emails').subscribe((res : any[])=>{
      //this.httpClient.get(this.globals.baseUrl + '/Emails').subscribe((res : any[])=>{
    console.log(res);
    this.emails = res;
    });
  }

  addEmail(){
    const activeModal = this.modalService.open(AddEmailComponent);
    activeModal.result.then(r => {
      this.get_emails();
    }, (reason) => {})
  }

  editEmail(id: number) {
    const activeModal = this.modalService.open(EditEmailComponent);
    activeModal.componentInstance.id = id;
    activeModal.result.then(r => {
      this.get_emails();
    }, (reason) => {})
  }




}