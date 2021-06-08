import { Component, OnInit, Input } from '@angular/core';
import { PoolService } from 'src/app/components/shared/pool.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pool } from 'src/app/components/shared/pool';
import { StatusService } from 'src/app/components/shared/status.service';

@Component({
  selector: 'app-edit-pool',
  templateUrl: './edit-pool.component.html',
  styleUrls: ['./edit-pool.component.css']
})
export class EditPoolComponent implements OnInit {
  @Input() idPool: number;
  pool: any = new Pool('', true, 0);
  public statuses: any [];

  constructor(
    private poolService: PoolService,
    private statusService: StatusService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.getPoolToEdit(this.idPool);
    this.getStatuses();
  }

  accept() {
    this.poolService.updatePool(this.pool).subscribe(r => {
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }

  getPoolToEdit(idPool: number) {
    this.poolService.getPool(idPool).subscribe(o => {
      this.pool = o;
    })
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe(o => {
      this.statuses = o;
    })
  }

}
