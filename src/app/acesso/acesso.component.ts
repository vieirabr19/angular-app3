import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('banner-animado', [
      state('criado', style({ opacity: 1 })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0)' }),
        animate( '800ms 0s ease-in-out' )
      ])
    ]),
    trigger('painel-animado', [
      state( 'criado', style({ opacity: 1 })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(50px, 0)'}),
        animate('1.5s ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0.15}),
          style({ opacity: 1, transform: 'translateX(0)', offset: 0.86}),

          style({ opacity: 1, transform: 'translateY(-10px)', offset: 0.88}),
          style({ opacity: 1, transform: 'translateY(10px)', offset: 0.90}),
          style({ opacity: 1, transform: 'translateY(-10px)', offset: 0.92}),
          style({ opacity: 1, transform: 'translateY(10px)', offset: 0.94}),
          style({ opacity: 1, transform: 'translateY(-10px)', offset: 0.96}),
          style({ opacity: 1, transform: 'translateY(10px)', offset: 0.98}),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public bannerAnimado: string = 'criado';
  public panelAnimado: string = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  public exibePainel(event: string): void{
    this.cadastro = event === 'cadastro' ? true : false;
  }

  public inicioAnimado(): void{
    // console.log('Inicio da animação')
  }
  public fimAnimado(): void{
    // console.log('Fim da animação')
  }
}