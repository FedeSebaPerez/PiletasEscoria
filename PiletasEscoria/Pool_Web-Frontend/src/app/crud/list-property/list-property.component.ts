import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { EditPropertyComponent } from '../edit-property/edit-property.component';


@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {


  private properties: any;
  poolForm: FormGroup;
  private userLoged: string;
  private isLoged : boolean;
  constructor(private httpClient: HttpClient,
    private globals: Globals,
 
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.get_properties();
  }


  get_properties(){
    this.httpClient.get(this.globals.baseUrl + '/Properties').subscribe((res : any[])=>{
    this.properties = res;
    });
  }

  addProperty(){
    const activeModal = this.modalService.open(AddPropertyComponent);
    activeModal.result.then(r => {
      this.get_properties();
    }, (reason) => {})
  }

  editProperty(id: number) {
    const activeModal = this.modalService.open(EditPropertyComponent);
    activeModal.componentInstance.id = id;
    activeModal.result.then(r => {
      this.get_properties();
    }, (reason) => {})
  }
  


}