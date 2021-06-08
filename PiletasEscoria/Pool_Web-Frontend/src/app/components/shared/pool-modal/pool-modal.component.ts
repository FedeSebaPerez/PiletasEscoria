import { Component, OnInit , Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../../../global'

interface Pool {
  idPool:any;
  identification:any;
  active: any;
  idStatus:any;
  insDateTime:any;
  updDateTime:any,
  poolStatusP:any,
  statusD:any
}

@Component({
  selector: 'app-pool-modal',
  templateUrl: './pool-modal.component.html',
  styleUrls: ['./pool-modal.component.css']
})

export class PoolModalComponent implements OnInit {
  @Input() id: number;
  data : FormData[] =[];
  poolForm: FormGroup;
  formGroup: FormGroup;
  private statuses = [];
  private pools : Pool; 
  private idStatus: number;
  private idPool: number;

  constructor(public poolModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private globals: Globals
    ) { }

  ngOnInit() {
    this.idStatus = 0;
    this.idPool = 0;
    this.getConditionalDataUsingAsync();
  }


  async getConditionalDataUsingAsync() {
    let dat = await this.httpClient.get<Pool>(this.globals.baseUrl + '/Pool/GetPoolById/'+this.id).toPromise();
    if (dat.idStatus != null) {
        await this.get_status();
    }
    this.idStatus = dat.idStatus;
    this.idPool = dat.idPool;

    this.data = await this.httpClient.get<FormData[]>(this.globals.baseUrl + '/PoolAction/'+this.idPool+'/'+this.idStatus).toPromise();
    
    this.pools = dat;

  }

  async get_status(){
    this.httpClient.get(this.globals.baseUrl + '/Status').subscribe((res : any[])=>{

      this.statuses = res;
      });

  }

  private getPoolById(){
    this.httpClient.get(this.globals.baseUrl + '/Pool/GetPoolById/'+this.id).subscribe((res : Pool)=>{

      this.pools = res;
      });
  }



  closePoolModal() {
    this.poolModal.close('Ventana Cerrada'+this.id);
  }

}
