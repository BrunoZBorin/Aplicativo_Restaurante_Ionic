
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Iproduto } from '../../interfaces/Iproduto';

import { ProdProvider } from '../../providers/prod/prod';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';

import { CarrinhoPage } from '../carrinho/carrinho';



@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  produto:Iproduto;
  lista:Iproduto[];
  carrinho=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public prodProvider: ProdProvider, public carrinhoProvider: CarrinhoProvider) {

  }
  ionViewDidEnter()
  {
    this.prodProvider.listaProdutos().subscribe( res =>{
        this.lista = res;},
        erro =>{
          console.log("Erro: "+ erro.message);
      });
      this.carrinhoProvider.getStorage('carrinho').then(res =>{
        if(res){
          this.carrinho = res;
        }
      });
 
  }

  abreCarrinho()
  {

    this.navCtrl.push ( CarrinhoPage );
  }
  addCarrinho(item)
  {
    /*for(let produto of this.carrinho){
      if(produto.id == item.id){
      return;
      }
    }*/
    this.carrinho.push(item);
    this.carrinhoProvider.setStorage('carrinho',this.carrinho);
  }
}
 