import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';
import { AddStatusComponent } from '../add-status/add-status.component';
import { EditStatusComponent } from '../edit-status/edit-status.component';


@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.css']
})
export class ListStatusComponent implements OnInit {

  private statuses: any;
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
    this.get_status();
  }


  get_status(){
    this.httpClient.get(this.globals.baseUrl + '/Status').subscribe((res : any[])=>{
    console.log(res);
    this.statuses = res;
    });
  }


  addStatus(){
    const activeModal = this.modalService.open(AddStatusComponent);
    activeModal.result.then(r => {
      this.get_status();
    }, (reason) => {})
  }

  editStatus(id: number) {
    const activeModal = this.modalService.open(EditStatusComponent);
    activeModal.componentInstance.id = id;
    activeModal.result.then(r => {
      this.get_status();
    }, (reason) => {})
  }



}