import { Component, OnInit } from '@angular/core';
import { PoolService } from 'src/app/components/shared/pool.service';
import { StatusService } from 'src/app/components/shared/status.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pool } from 'src/app/components/shared/pool';

@Component({
  selector: 'app-add-pool',
  templateUrl: './add-pool.component.html',
  styleUrls: ['./add-pool.component.css']
})
export class AddPoolComponent implements OnInit {
  pool = new Pool('', true, 0);
  private statuses: any [];
  constructor(
    private poolService: PoolService,
    private statusService: StatusService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.getStatuses();
  }

  public accept() {
    this.poolService.addPool(this.pool).subscribe(r => {
      
      const res = +r;
      if (res === 1) {
        this.activeModal.close();
      }
      else {
        console.log('No se ha guardado');
      }
    });
  }

  getStatuses() {
    this.statusService.getStatuses().subscribe(o => {
      this.statuses = o;
    })
  }

}
