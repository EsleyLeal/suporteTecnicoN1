import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

enum Equipamento {
  WIFI_INTEGRADO = 'wifiIntegrado',
  ONU_ROTEADOR = 'onuRoteador',
  FTTB = 'fttb'
}

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  // Propriedades relacionadas ao cliente e técnico
  nomeDoCliente: string = '';
  nomeDoTecnico: string = '';

  // Propriedades relacionadas aos equipamentos
  aparelhoSelecionado: string = '';
  aparelhoSelecionadoOntP: string = '';
  senhaSelecionada: string = '';
  wifiIntegrado: string = 'WIFI INTEGRADO';
  ont: string = 'FHTT/SN DA ONU:     ';
  ontPatrimonio: string = 'PATRIMONIO DA ONU:     ';
  senhaWifi: string = 'SENHA DO WIFI:     ';
  roteador: string = 'ONU + ROTEADOR';
  onu: string = 'FHTT DA ONU: ';
  onuRoteador: string = 'PATRIMONIO DO ROTEADOR: ';
  fttb: string = 'FTTB';
  fttbSelecionado: string = '';

  // Propriedades relacionadas ao CTO/CEIP
  cto: string = 'CTO:';
  tipoCtoCeipSelecionado: string = '';
  valorPortaCtoCeip: number | undefined;
  ceip: string = 'CEIP:';
  valorCtoCeip: string = '';
  semIdentificacao: boolean = false;

  // Propriedades relacionadas à visibilidade dos inputs
  mostrarInputCtoCeip: boolean = true;
  mostrarInputAS: boolean = false;
  esconderInput: boolean = false;
  mostrarInputSenha: boolean = false;
  mostrarInputFTTB: boolean = false;

  // Propriedade para o atendimento gerado
  atendimentoGerado: string = '';

  // Métodos de seleção de equipamento e CTO/CEIP
  selecaoEquipamento(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;

    switch (valorSelecionado) {
      case Equipamento.WIFI_INTEGRADO:
        this.configurarEquipamentoWiFiIntegrado();
        break;
      case Equipamento.ONU_ROTEADOR:
        this.configurarEquipamentoOnuRoteador();
        break;
      case Equipamento.FTTB:
        this.configurarEquipamentoFttb();
        break;
    }
  }

  selecaoCtoCeip(event: Event) {
    const valorSelecionado = (event.target as HTMLSelectElement).value;
    console.log('CTO/CEIP selecionado:', valorSelecionado);

    switch (valorSelecionado) {
      case 'cto':
        this.configurarCto();
        break;
      case 'ceip':
        this.configurarCeip();
        break;
      case 'ctoSemIdentificacao':
        this.configurarCtoSemIdentificacao();
        break;
    }
  }

  gerarAtendimento() {

    // Normalizando strings para comparação
    const aparelho = this.aparelhoSelecionado.trim().toLowerCase();
    const ont = this.ont.trim().toLowerCase();
    const onu = this.onu.trim().toLowerCase();
    const fttb = this.fttb.trim().toLowerCase();

    const identificacao = this.obterIdentificacao();

    if (aparelho.includes(ont)) {
      console.log('Entrou na condição ONT');
      this.atendimentoGerado = `
      DATA 30/07/2024:

      ATIVAÇÃO REALIZADA COM SUCESSO!

      NOME DO CLIENTE: ${this.nomeDoCliente}
      NOME DO TECNICO: ${this.nomeDoTecnico}
      ${this.wifiIntegrado}
      ${this.aparelhoSelecionado}
      ${this.aparelhoSelecionadoOntP}
      ${this.senhaSelecionada}
      ${identificacao}
      `;
    } else if (aparelho.includes(onu)) {
      console.log('Entrou na condição ONU');
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
    } else if (aparelho.includes(fttb)) {
      this.atendimentoGerado = `
      DATA 30/07/2024:

      ATIVAÇÃO REALIZADA COM SUCESSO!

      NOME DO CLIENTE: ${this.nomeDoCliente}
      NOME DO TECNICO: ${this.nomeDoTecnico}
      ${this.fttb}
      ${this.fttbSelecionado}
      ${identificacao}
      `;
    } else {
      this.atendimentoGerado = 'Erro: Aparelho não reconhecido ou informação insuficiente.';
    }

    console.log('Atendimento Gerado:', this.atendimentoGerado);
  }

  // Métodos auxiliares para configuração e geração de mensagens
  private configurarEquipamentoWiFiIntegrado() {
    this.mostrarInputFTTB = false;
    this.mostrarInputAS = true;
    this.mostrarInputSenha = true;
    this.aparelhoSelecionado = this.ont;
    this.aparelhoSelecionadoOntP = this.ontPatrimonio;
    this.senhaSelecionada = this.senhaWifi;
  }

  private configurarEquipamentoOnuRoteador() {
    this.mostrarInputFTTB = false;
    this.mostrarInputAS = true;
    this.mostrarInputSenha = false;
    this.aparelhoSelecionado = this.onu;
    this.aparelhoSelecionadoOntP = this.onuRoteador;
  }

  private configurarEquipamentoFttb() {
    this.mostrarInputAS = false;
    this.mostrarInputSenha = false;
    this.mostrarInputFTTB = true;
    this.aparelhoSelecionado = this.fttb;
    this.fttbSelecionado = this.onuRoteador;
  }

  private configurarCto() {
    this.tipoCtoCeipSelecionado = this.cto;
    this.esconderInput = true;
    this.mostrarInputCtoCeip = true;
  }

  private configurarCeip() {
    this.tipoCtoCeipSelecionado = this.ceip;
    this.esconderInput = true;
    this.mostrarInputCtoCeip = true;
  }

  private configurarCtoSemIdentificacao() {
    this.esconderInput = true;
    this.mostrarInputCtoCeip = false;
  }

  private equipamentoSelecionado(tipo: string): boolean {
    return this.aparelhoSelecionado.trim().toLowerCase().includes(tipo.trim().toLowerCase());
  }

  private obterIdentificacao(): string {
    return this.semIdentificacao
      ? `SEM IDENTIFICAÇÃO - PORTA: ${this.valorPortaCtoCeip}`
      : `${this.tipoCtoCeipSelecionado} - ${this.valorCtoCeip} - PORTA: ${this.valorPortaCtoCeip}`;
  }
}
