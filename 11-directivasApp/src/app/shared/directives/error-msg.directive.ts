import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[error-msg]',
})
export class ErrorMsgDirective implements OnInit, OnChanges {
  htmlElement: ElementRef<HTMLElement>;

  private _color: string = 'red';
  private _mensaje: string = 'Campo requerido';

  @Input() set color(valor: string) {
    /* Se coloca set color para cambiar los valores del mismo, 
    sin mantener la propiedad, si es necesario saber el color,
    se necesita crear una propiedad privada.
    */
    // this.htmlElement.nativeElement.style.color = valor;
    this._color = valor;
    // Para optimizar, se manda llavar los metodos respectivos
    this.setColor();
  }
  // @Input() mensaje: string = 'Este campo es necesario';
  @Input() set mensaje(valor: string) {
    // Al iniciar, es undefined.
    // this.htmlElement.nativeElement.innerText = valor;
    // Accediendo al valor del mensaje
    this._mensaje = valor;
    this.setMensaje();
  }

  @Input() set valido(valor: boolean) {
    // Clase hidden en styles.css
    if (valor === true) {
      this.htmlElement.nativeElement.classList.add('hidden');
    } else {
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log('constructor directiva');
    // console.log(el);
    this.htmlElement = el;
  }
  ngOnChanges(changes: SimpleChanges): void {
    /*
    Si se cambian dos eventos al mismo tiempo se recibe un 
    objeto {color,mensaje} con los dos cambios en changes, 
    en cambio si se cambian por separado (si se cambia un input), 
    no se notifica de los changes. Se hace un console log 
    del evento para ver los valores que tiene dentro y saber 
    a que propiedad acceder
    */
    // console.log(changes);
  }
  ngOnInit(): void {
    // Al utilizarlos, el valor de color y mensaje es undefined.
    // this.setColor();
    // this.setMensage();
    // console.log('ngOnInit directiva');

    // Se reutilizan utilizando la propiedad privada (_color,_mensaje)
    this.setEstilo();
    this.setColor();
    this.setMensaje();
  }

  setColor(): void {
    this.htmlElement.nativeElement.style.color = this._color;
  }
  setMensaje(): void {
    this.htmlElement.nativeElement.innerText = this._mensaje;
  }

  setEstilo(): void {
    this.htmlElement.nativeElement.classList.add('form-text');
  }
}
