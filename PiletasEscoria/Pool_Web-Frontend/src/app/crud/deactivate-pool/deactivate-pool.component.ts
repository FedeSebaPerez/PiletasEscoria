import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from 'src/app/components/shared/pool.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pool } from 'src/app/components/shared/pool';

@Component({
  selector: 'app-deactivate-pool',
  templateUrl: './deactivate-pool.component.html',
  styleUrls: ['./deactivate-pool.component.css']
})
export class DeactivatePoolComponent implements OnInit {
  @Input() idPool: number;
  @Input() status: boolean;

  constructor(
    private service: PoolService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  public accept() {
    

    this.service.deactivatePool(this.idPool, this.status).subscribe(r => {
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
