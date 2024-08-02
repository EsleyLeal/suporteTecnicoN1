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

  ont: string = 'FHTT/SN DA ONU:     ';
  ontPatrimonio: string = 'PATRIMONIO DA ONU:     ';
  aparelhoSelecionado: string = '';
  wifiIntegrado: string = 'WIFI INTEGRADO';

  roteador: string = 'ONU + ROTEADOR'
  onu: string = 'FHTT DA ONU: ';
  onuRoteador: string = 'PATRIMONIO DO ROTEADOR: ';
  aparelhoSelecionadoOntP: string = '';

  cto: string = 'CTO:'
  ceip:string = 'CEIP:'
  ctoSelecionada: string = '';
  tipoCtoCeipSelecionado: string = '';
  valorCtoCeip: string = '';
  valorPortaCtoCeip: number | undefined;
  semIdentificacao: boolean = false;

  mostrarInputCtoCeip: boolean = true;
  mostrarInputAS: boolean = false;
  esconderInput:boolean = false;

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
      this.esconderInput = true;
      this.mostrarInputCtoCeip = true;
    } else if (valorSelecionado === 'ceip') {
      this.tipoCtoCeipSelecionado = this.ceip;
      this.esconderInput = true;
      this.mostrarInputCtoCeip = true;
    } else if (valorSelecionado === 'ctoSemIdentificacao') {
      this.esconderInput = true;
      this.mostrarInputCtoCeip = false;
    }
  }



  gerarAtendimento() {

    console.log('Função gerarAtendimento chamada');


    // Normalizando strings para comparação
    const aparelho = this.aparelhoSelecionado.trim().toLowerCase();
    const ont = this.ont.trim().toLowerCase();
    const onu = this.onu.trim().toLowerCase();

    const identificacao = this.semIdentificacao
        ? `SEM IDENTIFICAÇÃO - PORTA: ${this.valorPortaCtoCeip}`
        : `${this.tipoCtoCeipSelecionado} - ${this.valorCtoCeip} - PORTA: ${this.valorPortaCtoCeip}`;


    if (aparelho.includes(ont)) {
      this.atendimentoGerado = `
      DATA 30/07/2024:

      ATIVAÇÃO REALIZADA COM SUCESSO!

      NOME DO CLIENTE: ${this.nomeDoCliente}
      NOME DO TECNICO: ${this.nomeDoTecnico}
      ${this.wifiIntegrado}
      ${this.aparelhoSelecionado}
      ${this.aparelhoSelecionadoOntP}
      ${identificacao}
      `;
    } else if (aparelho.includes(onu)) {
      this.atendimentoGerado = `
      DATA 30/07/2024:

      ATIVAÇÃO REALIZADA COM SUCESSO!

      NOME DO CLIENTE: ${this.nomeDoCliente}
      NOME DO TECNICO: ${this.nomeDoTecnico}
      ${this.roteador}
      ${this.aparelhoSelecionado}
      ${this.aparelhoSelecionadoOntP}
      ${identificacao}
      `;
    } else {
      this.atendimentoGerado = 'Erro: Aparelho não reconhecido ou informação insuficiente.';
    }

    console.log('Atendimento Gerado:', this.atendimentoGerado);
  }
}
