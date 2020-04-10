import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('banner-animado', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-50px, 0)'
        }),
        animate('800ms 0s ease-in-out')
      ])
    ]),
    trigger('painel-animado', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)'
        }),
        animate('800ms 0s ease-in-out')
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
}