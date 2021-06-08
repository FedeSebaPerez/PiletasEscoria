import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from 'src/app/components/shared/pool.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/global';
// import { Pool } from 'src/app/components/shared/pool';

@Component({
  selector: 'app-delete-pool',
  templateUrl: './delete-pool.component.html',
  styleUrls: ['./delete-pool.component.css']
})
export class DeletePoolComponent implements OnInit {
  @Input() idPool: number;
  @Input() status: boolean;

  estado : string;

  constructor(
    private service: PoolService,
    private httpClient: HttpClient,
    private globals: Globals,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if(!this.status)
    {
      this.estado = "Activo";
    }
    else{
      this.estado = "Inactivo";
    }

  }

  public accept() {

      this.httpClient.get(this.globals.baseUrl + '/Pool/DeactivatePool/'+this.idPool+'/'+this.status)

        .subscribe(r => {
          const res = +r;
            if (res === 1) {
              this.activeModal.close();
            }
            else {
              console.log('No se ha guardado');
            }
          });

  }


}
