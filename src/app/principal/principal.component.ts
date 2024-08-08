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
  senhaWifi: string = 'SENHA DO WIFI:     ';
  senhaSelecionada: string = '';
  aparelhoSelecionado: string = '';
  wifiIntegrado: string = 'WIFI INTEGRADO';

  roteador: string = 'ONU + ROTEADOR';
  fttb: string = 'FTTB';
  fttbSelecionado = '';
  onu: string = 'FHTT DA ONU: ';
  onuRoteador: string = 'PATRIMONIO DO ROTEADOR: ';
  aparelhoSelecionadoOntP: string = '';

  cto: string = 'CTO:';
  ceip: string = 'CEIP:';
  ctoSelecionada: string = '';
  tipoCtoCeipSelecionado: string = '';
  valorCtoCeip: string = '';
  valorPortaCtoCeip: number | undefined;
  semIdentificacao: boolean = false;

  mostrarInputCtoCeip: boolean = true;
  mostrarInputAS: boolean = false;
  esconderInput: boolean = false;
  mostrarInputSenha: boolean = false;
  mostrarInputFTTB: boolean = false;

  atendimentoGerado: string = '';

  selecaoEquipamento(event: any) {
    const valorSelecionado = event.target.value;
    console.log('Equipamento selecionado:', valorSelecionado);

    if (valorSelecionado === 'wifiIntegrado') {
      this.mostrarInputFTTB = false;
      this.mostrarInputAS = true;
      this.mostrarInputSenha = true;
      this.aparelhoSelecionado = this.ont;
      this.aparelhoSelecionadoOntP = this.ontPatrimonio;
      this.senhaSelecionada = this.senhaWifi;
    } else if (valorSelecionado === 'onuRoteador') {
      this.mostrarInputFTTB = false;
      this.mostrarInputAS = true;
      this.mostrarInputSenha = false;
      this.aparelhoSelecionado = this.onu;
      this.aparelhoSelecionadoOntP = this.onuRoteador;
    } else if (valorSelecionado === 'fttb') {
      this.mostrarInputAS = false;
      this.mostrarInputSenha = false;
      this.mostrarInputFTTB = true;
      this.aparelhoSelecionado = this.fttb; // Ajuste importante
      this.fttbSelecionado = this.onuRoteador;
    }
  }

  selecaoCtoCeip(event: any) {
    const valorSelecionado = event.target.value;
    console.log('CTO/CEIP selecionado:', valorSelecionado);

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
    console.log('Valor de fttb:', this.fttb);
    console.log('Valor de fttbSelecionado:', this.fttbSelecionado);

    // Normalizando strings para comparação
    const aparelho = this.aparelhoSelecionado.trim().toLowerCase();
    const ont = this.ont.trim().toLowerCase();
    const onu = this.onu.trim().toLowerCase();
    const fttb = this.fttb.trim().toLowerCase();

    console.log('Aparelho normalizado:', aparelho);
    console.log('ONT normalizado:', ont);
    console.log('ONU normalizado:', onu);
    console.log('FTTB normalizado:', fttb);

    const identificacao = this.semIdentificacao
      ? `SEM IDENTIFICAÇÃO - PORTA: ${this.valorPortaCtoCeip}`
      : `${this.tipoCtoCeipSelecionado} - ${this.valorCtoCeip} - PORTA: ${this.valorPortaCtoCeip}`;

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
      console.log('Entrou na condição FTTB');
      this.atendimentoGerado = `
      DATA 30/07/2024:

      ATIVAÇÃO REALIZADA COM SUCESSO!

      NOME DO CLIENTE: ${this.nomeDoCliente}
      NOME DO TECNICO: ${this.nomeDoTecnico}

      ${this.fttbSelecionado}
      ${identificacao}
      `;
    } else {
      console.log('Erro: Aparelho não reconhecido ou informação insuficiente.');
      this.atendimentoGerado = 'Erro: Aparelho não reconhecido ou informação insuficiente.';
    }

    console.log('Atendimento Gerado:', this.atendimentoGerado);
  }
}
