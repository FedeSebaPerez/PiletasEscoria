import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../global'
import { FormGroup, FormBuilder } from '@angular/forms';
import { StatusService } from 'src/app/components/shared/status.service';

import { Router, NavigationEnd } from '@angular/router';
import { PoolService } from 'src/app/components/shared/pool.service';
import { EditPoolStatusPropertyComponent } from '../edit-pool-status-property/edit-pool-status-property.component';

@Component({
  selector: 'app-list-pool-status-property',
  templateUrl: './list-pool-status-property.component.html',
  styleUrls: ['./list-pool-status-property.component.css']
})
export class ListPoolStatusPropertyComponent implements OnInit {

  private selectedItem: any;
  private selectedItemS: any;
  private pools: any; 
  private properties: any;
  private statuses = [];
  poolForm: FormGroup;
  private userLoged: string;
  private isLoged : boolean;
  constructor(private httpClient: HttpClient,
    private globals: Globals,
    private statusService: StatusService,
    private poolService: PoolService,
    private modalServiceTwo: NgbModal,
    private modalServiceOne: NgbModal,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.selectedItem = 0;
    this.selectedItemS = 0;
    this.get_pool();
    this.get_status();
  }

  get_pool(){
    this.poolService.getPools().subscribe(o => {
      this.pools = o;
    })
  }

  get_status(){
    this.statusService.getStatuses().subscribe(o => {
      this.statuses = o;
    })
  }

  async objChangedP(event: any){
    this.selectedItemS = 0;
    this.properties = [];
    
  }

  async objChanged(event: any){
    if(this.selectedItemS == 0)
    {
      this.selectedItem = 0;
      this.properties = [];
    }
    else{
      this.get_status_by_pool();
    }
    
  }

  get_status_by_pool(){
    if(this.selectedItem != 0 && this.selectedItemS != 0){
      this.httpClient.get(this.globals.baseUrl + '/Property/GetAllPropertiesByPoolStatus/'+this.selectedItem+'/'+this.selectedItemS).subscribe((res : any[])=>{
      console.log(res);
      this.properties = res;
      });
    }
}


  disableProperty(idPool: number, idProperty: number, idStatus: number)
  {
    var opcion = confirm("Desea eliminar esta propiedad");
    if (opcion == true) {

      //api/Property/DeletePoolStatusProperty/{idPool}/{idStatus}/{idProperty}"
      this.httpClient.get(this.globals.baseUrl + '/Property/DeletePoolStatusProperty/'+idPool+'/'+idStatus+'/'+idProperty).subscribe((res : any[])=>{
        if(res.toString() != "Ok"){
          alert(res);
        }
       

        });

        this.ngOnInit();
        this.selectedItemS = idStatus;
        this.selectedItem = idPool;

        this.properties = [];

        this.get_status_by_pool();
	  } 
  }

  editProperty(idPool: number, idProperty: number, idStatus: number, psValue: string)
  {
    const modalRef = this.modalServiceOne.open(EditPoolStatusPropertyComponent);
        modalRef.componentInstance.title = "Editar Propiedad";
        modalRef.componentInstance.msg = ""; //idPool+","+idProperty+","+idStatus;
        modalRef.componentInstance.idPool = idPool;
        modalRef.componentInstance.idStatus = idStatus;
        modalRef.componentInstance.idProperty = idProperty;
        modalRef.componentInstance.psValue = psValue;

		
        modalRef.componentInstance.action = "Edit";
        modalRef.result.then((result) => {
          console.log(result);
          
          this.ngOnInit();
          this.selectedItemS = idStatus;
          this.selectedItem = idPool;
  
          this.properties = [];
  
          this.get_status_by_pool();


        }).catch((error) => {
          console.log(error);
          this.ngOnInit();
          this.httpClient.get(this.globals.baseUrl + '/Property/GetAllPropertiesByPoolStatus/'+idPool+'/'+idStatus).subscribe((res : any[])=>{

          this.properties = res;
            });

          this.selectedItem = idPool;
          this.selectedItemS = idStatus;
          this.get_pool();
          this.get_status();


        });

  }


  addElement()
  {
    var idPool = this.selectedItem;
    var idStatus = this.selectedItemS;
    
    if(this.selectedItem != 0 && this.selectedItemS != 0){
      
      const modalRef2 = this.modalServiceTwo.open(EditPoolStatusPropertyComponent);
        modalRef2.componentInstance.title = "Nueva Propiedad";
        modalRef2.componentInstance.msg = "";
        modalRef2.componentInstance.action = "New";
        modalRef2.componentInstance.idStatus = this.selectedItemS;
        modalRef2.componentInstance.idPool = this.selectedItem;
        modalRef2.componentInstance.idProperty = "0";
        modalRef2.result.then((result) => {
          console.log(result);
          //this.ngOnInit();
          this.ngOnInit();
          this.selectedItemS = idStatus;
          this.selectedItem = idPool;
  
          this.properties = [];
  
          this.get_status_by_pool();
        }).catch((error) => {
          console.log(error);
          //this.ngOnInit();
          this.ngOnInit();
          this.selectedItemS = idStatus;
          this.selectedItem = idPool;
  
          this.properties = [];
  
          this.get_status_by_pool();
        });
      }
      else{
        const modalRef2 = this.modalServiceTwo.open(EditPoolStatusPropertyComponent);
        modalRef2.componentInstance.title = "Error";
        modalRef2.componentInstance.msg = "Debe seleccionar Pileta y Estado";
        modalRef2.componentInstance.action = "Error";
        modalRef2.result.then((result) => {
          console.log(result);
          //this.ngOnInit();

          this.ngOnInit();
          this.selectedItemS = idStatus;
          this.selectedItem = idPool;
  
          this.properties = [];
  
          this.get_status_by_pool();
        }).catch((error) => {
          console.log(error);
          //this.ngOnInit();
          this.ngOnInit();
        this.selectedItemS = idStatus;
        this.selectedItem = idPool;

        this.properties = [];

        this.get_status_by_pool();
        });
      }
  }

}
