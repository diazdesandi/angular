import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customIf]',
})

/*
    Directivas estructurales
*/
export class CustomIfDirective {
  @Input() set customIf(condicion: boolean) {
    if (condicion) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    // TemplateRef a un mayor nivel que ElementRef
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef
  ) {
    // Para asegurarse de que se este llamando
    // console.log('customIf');
  }
}
