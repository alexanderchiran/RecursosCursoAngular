import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log("Parametros: " + this.route.snapshot.queryParams);
    // el + hace que se convierta de string a numero
    const id = +this.route.snapshot.params['id'];
    console.log("server id: " + id);
    this.server = this.serversService.getServer(id);
    //subscribe
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    )
  }

  onEdit() {
    console.log("Entra al servicio de editar server")
    //this.router.navigate(['edit', { relativeTo: this.route }]);
    //type QueryParamsHandling = 'merge' | 'preserve' | '';
    //https://angular.io/api/router/QueryParamsHandling
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
