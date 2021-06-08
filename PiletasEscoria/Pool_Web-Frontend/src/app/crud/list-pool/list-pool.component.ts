import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router, NavigationEnd } from '@angular/router';
import { AddPoolComponent } from '../add-pool/add-pool.component';
import { DeletePoolComponent } from '../delete-pool/delete-pool.component';
import { DeactivatePoolComponent } from '../deactivate-pool/deactivate-pool.component';
import { EditPoolComponent } from '../edit-pool/edit-pool.component';

import { PoolService } from '../../components/shared/pool.service';
import { Pool } from 'src/app/components/shared/pool';


@Component({
  selector: 'app-list-pool',
  templateUrl: './list-pool.component.html',
  styleUrls: ['./list-pool.component.css']
})
export class ListPoolComponent implements OnInit {

  public idPool: number;
  public selectedPool: any;
  private pools: any; 
  private statuses = [];
  poolForm: FormGroup;
  private userLoged: string;
  private isLoged : boolean;
  constructor(private httpClient: HttpClient,
    private globals: Globals,
    
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private poolService: PoolService
    ) { }

  ngOnInit() {
    this.getPools();
  }

  getPool(idPool: number){
    this.poolService.getPool(idPool).subscribe(o => {
      this.selectedPool = o;
    })
  }

  getPools(){
    this.poolService.getPools().subscribe(o => {
      this.pools = o;
    })
  }

  addPool(){
    const activeModal = this.modalService.open(AddPoolComponent);
    activeModal.result.then(r => {
      this.loadPools();
    }, (reason) => {})
  }

  deletePool(idPool: number, status: boolean) {
    const activeModal = this.modalService.open(DeletePoolComponent);
    activeModal.componentInstance.idPool = idPool;
    activeModal.componentInstance.status = status;
    activeModal.result.then(r => {
      this.loadPools();
    }, (reason) => {})
  }

  deactivatePool(idPool: number)
  {
    const activeModal = this.modalService.open(DeactivatePoolComponent);
    activeModal.componentInstance.idPool = idPool;
    activeModal.result.then(r => {
      this.loadPools();
    }, (reason) => {})
  }
  
  editPool(idPool: number) {
    const activeModal = this.modalService.open(EditPoolComponent);
    activeModal.componentInstance.idPool = idPool;
    activeModal.result.then(r => {
      this.loadPools();
    }, (reason) => {})
  }

  loadPools() {
    this.poolService.getPools().subscribe(r => {
      this.pools = r;
    })
  }

}
