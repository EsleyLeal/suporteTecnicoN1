import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  nomeDoCliente: string = '';
  nomeDoTecnico: string = '';

  ont: string = 'DIGITE O FHTT DA ONU';
  ontPatrimonio: string = 'DIGITE O PATRIMONIO DA ONU';

  onu: string = 'DIGITE O FHTT DA ONU';
  onuRoteador: string = 'DIGITE O PATRIMONIO DO ROTEADOR';

  cto: string = 'DIGITE A CTO E A PORTA'
  ceip:string = 'DIGITE A CEIP E A PORTA'

  aparelhoSelecionado: string = '';
  aparelhoSelecionadoOntP: string = '';
  ctoSelecionada: string = '';

  tipoCtoCeipSelecionado: string = '';
  valorCtoCeip: string = '';



  mostrarInputCtoCeip: boolean = true;
  mostrarInputAS = false;

  atendimentoGerado: string = '';

  selecaoEquipamento(event: any) {
    const valorSelecionado = event.target.value;
    if (valorSelecionado === 'wifiIntegrado') {
      this.mostrarInputAS = true;
      this.aparelhoSelecionado = this.ont;
      this.aparelhoSelecionadoOntP = this.ontPatrimonio;
    } else {
      this.mostrarInputAS = true;
      this.aparelhoSelecionado = this.onu;
      this.aparelhoSelecionadoOntP = this.onuRoteador;
    }
  }


  selecaoCtoCeip(event: any) {
    const valorSelecionado = event.target.value;
    if (valorSelecionado === 'cto') {
      this.tipoCtoCeipSelecionado = this.cto;
      this.mostrarInputCtoCeip = true;
    } else if (valorSelecionado === 'ceip') {
      this.tipoCtoCeipSelecionado = this.ceip;
      this.mostrarInputCtoCeip = true;
    } else if (valorSelecionado === 'ctoSemIdentificacao') {
      this.mostrarInputCtoCeip = false;
    }
  }

  gerarAtendimento() {
    // Detalhes básicos do atendimento

    if(this.mostrarInputCtoCeip) {
      this.atendimentoGerado += `
      DATA 30/07/2024:

      ATIVAÇÃO REALIZADA COM SUCESSO!

      NOME DO CLIENTE: ${this.nomeDoCliente}
      NOME DO TECNICO: ${this.nomeDoTecnico}
      EQUIPAMENTO: ${this.valorCtoCeip}
      `;
    } 




    // Log para depuração
    console.log(this.atendimentoGerado);
  }

}
