import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from '../../shared/imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner-animado', [
      state('visivel', style({
        opacity: 1
      })),
      state('escondido', style({
        opacity: 0
      })),
      transition('escondido <=> visivel', [
        animate('800ms 0s ease-in')
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {

  public imagens: Imagem[] = [
    {estado: 'visivel', url: '/assets/banner-acesso/img_1.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_2.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_3.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_4.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_5.png'}
  ];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicaRatacao(), 3000);
  }

  public logicaRatacao(): void{
    let idx: number;

    for(let i = 0; i < this.imagens.length; i++){
      if(this.imagens[i].estado === 'visivel'){
        this.imagens[i].estado = 'escondido';
        idx = i === this.imagens.length - 1 ? 0 : i + 1;
        break;
      }
    }

    this.imagens[idx].estado = 'visivel';

    setTimeout(() => this.logicaRatacao(), 3000);
  }

}
