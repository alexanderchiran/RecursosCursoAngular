import { Observable } from 'rxjs/Observable';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**cuando se está editando un registro pero se quiere salir el sistema pregunta si está seguro 
de descartar los cambios
**/
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**cuando se está editando un registro pero se quiere salir el sistema pregunta si está seguro 
de descartar los cambios
**/
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  // simbolo ? : significa que este argumento es opcional
  canDeactivate(component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
