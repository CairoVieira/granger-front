import React, { Component } from "react";
import Menu from "./Menu";
import axios from "axios";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Histograma from "./Histrograma";
import Tabela from "./Tabela";
import Axios from "axios";

const URL = "http://localhost:3001";
// const URL = "https://grangerapi-com.umbler.net"

class Descritiva extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nomeVariavel: "",
			resultado: {},
			dados: "",
			amostra: true,
			populacao: false,
		};

		this.handleNomeVariavel = this.handleNomeVariavel.bind(this);
		this.handleDados = this.handleDados.bind(this);
		this.handleAmostra = this.handleAmostra.bind(this);
		this.handlePopulacao = this.handlePopulacao.bind(this);
		this.calcular = this.calcular.bind(this);
	}

	handleNomeVariavel() {
		this.setState({ nomeVariavel: this.nomeVariavel.value });
	}

	handleDados() {
		this.setState({ dados: this.dados.value });
	}

	handleAmostra() {
		this.setState({ amostra: !this.state.amostra });
		this.setState({ populacao: !this.state.populacao });
	}

	handlePopulacao() {
		this.setState({ populacao: !this.state.populacao });
		this.setState({ amostra: !this.state.amostra });
	}

	async handleUp(linha) {
		let vetor = this.state.resultado.dados;
		let indexLinha = vetor.indexOf(linha);
		let indexTroca = indexLinha - 1;
		let auxLinha = vetor[indexTroca];

		vetor = vetor.filter((item) => item !== linha);
		vetor = vetor.filter((item) => item !== auxLinha);

		vetor.splice(indexTroca, 0, linha);
		vetor.splice(indexLinha, 0, auxLinha);

		let novoResultado = this.state.resultado;
		novoResultado.dados = vetor;

		this.setState({ resultado: novoResultado });

		let body = {
			tipo: this.state.resultado.tipo,
			dados: [],
		};

		this.state.resultado.dados.forEach((item) => {
			for (let index = 0; index < item.value; index++) {
				body.dados.push(item.name);
			}
		});

		body = JSON.stringify(body);
		let header = {
			"Content-type": "application/json",
		};
		await Axios.post(`${URL}/mediana`, body, { headers: header })
			.then((response) => {
				novoResultado = this.state.resultado;
				novoResultado.mediana = response.data;
				this.setState({ resultado: novoResultado });
			})
			.catch((erro) => console.log(erro));
	}

	async handleDown(linha) {
		let vetor = this.state.resultado.dados;
		let indexLinha = vetor.indexOf(linha);
		let indexTroca = indexLinha + 1;
		let auxLinha = vetor[indexTroca];

		vetor = vetor.filter((item) => item !== linha);
		vetor = vetor.filter((item) => item !== auxLinha);

		vetor.splice(indexLinha, 0, auxLinha);
		vetor.splice(indexTroca, 0, linha);

		let novoResultado = this.state.resultado;
		novoResultado.dados = vetor;

		this.setState({ resultado: novoResultado });
		let body = {
			tipo: this.state.resultado.tipo,
			dados: [],
		};

		this.state.resultado.dados.forEach((item) => {
			for (let index = 0; index < item.value; index++) {
				body.dados.push(item.name);
			}
		});

		body = JSON.stringify(body);
		let header = {
			"Content-type": "application/json",
		};
		await Axios.post(`${URL}/mediana`, body, { headers: header })
			.then((response) => {
				novoResultado = this.state.resultado;
				novoResultado.mediana = response.data;
				this.setState({ resultado: novoResultado });
			})
			.catch((erro) => console.log(erro));
	}

	renderizaMedidaCentral() {
		if (this.state.resultado.media.trim() && this.state.resultado.moda.trim() && this.state.resultado.mediana.trim())
			return (
				<div className="medida-central">
					<span className="text-capitalize ">
						{this.state.resultado.media} - {this.state.resultado.moda} - {this.state.resultado.mediana}
					</span>
				</div>
			);
		if (!this.state.resultado.media.trim() && this.state.resultado.moda.trim() && this.state.resultado.mediana.trim())
			return (
				<div className="medida-central">
					<span className="text-capitalize ">
						{this.state.resultado.moda} - {this.state.resultado.mediana}
					</span>
				</div>
			);
		if (this.state.resultado.media.trim() && !this.state.resultado.moda.trim() && this.state.resultado.mediana.trim())
			return (
				<div className="medida-central">
					<span className="text-capitalize ">
						{this.state.resultado.media} - {this.state.resultado.mediana}
					</span>
				</div>
			);
		if (this.state.resultado.media.trim() && this.state.resultado.moda.trim() && !this.state.resultado.mediana.trim())
			return (
				<div className="medida-central">
					<span className="text-capitalize ">
						{this.state.resultado.media} - {this.state.resultado.moda}
					</span>
				</div>
			);
	}

	calcular(evento) {
		evento.preventDefault();
		let body = this.state;
		body = JSON.stringify(body);
		let header = {
			"Content-type": "application/json",
		};
		axios
			.post(URL + "/descritiva", body, { headers: header })
			.then((res) => {
				this.setState({ resultado: res.data });
			})
			.catch((res) => {
				console.log("Erro", res);
			});
	}

	render() {
		return (
			<div className="background">
				{console.log("this", this.state)}
				<Menu />
				<div className="container-fluid">
					{!this.state.resultado.dados && (
						<div className="row">
							<div className="col-md-12 col-sm-12">
								<form className="form-custom formulario" onSubmit={this.calcular}>
									<div className="form-row">
										<div className="form-group col-12">
											<input
												type="text"
												id="nomeVariavel"
												placeholder="Nome da variável"
												className="form-control"
												required
												value={this.state.nomeVariavel}
												onChange={this.handleNomeVariavel}
												ref={(input) => (this.nomeVariavel = input)}
												autoComplete="on"
											></input>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-12">
											<input
												type="text"
												id="dados"
												placeholder="Dados separados por ';'"
												className="form-control"
												required
												value={this.state.dados}
												onChange={this.handleDados}
												ref={(input) => (this.dados = input)}
												autoComplete="on"
											></input>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-12 text-center d-flex flex-column">
											<div className="btn-group btn-group-toggle" data-toggle="buttons">
												<label className="btn btn-secondary active">
													Amostra
													<input type="radio" name="options" id="amostra" defaultChecked onClick={this.handleAmostra} ref={(input) => (this.amostra = input)}></input>
												</label>
												<label className="btn btn-secondary">
													População
													<input type="radio" name="options" id="populacao" onClick={this.handlePopulacao} ref={(input) => (this.populacao = input)}></input>
												</label>
											</div>
										</div>
									</div>
									<div className="form-row mt-0.5">
										<div className="col-12 text-center">
											<input type="submit" className="btn btn-outline-secondary btn-custom" id="btnCalcular" value="Calcular"></input>
										</div>
									</div>
								</form>
							</div>
						</div>
					)}
					<div className="row">
						<div className="col-md-12 col-sm-12">
							{this.state.resultado.dados && (
								<div className="form-custom">
									<div className="row ">{this.renderizaMedidaCentral()}</div>
									<div className="row">
										<div className="col-md-6 col-sm-12">
											{this.state.resultado.tipo === "qualitativa" && <PieChart dataGrafico={this.state.resultado.dados} />}
											{this.state.resultado.tipo === "quantitativaDiscreta" && <BarChart dataGrafico={this.state.resultado.dados} nomeLegenda={this.state.resultado.variavel} />}
											{this.state.resultado.tipo === "quantitativaContinua" && <Histograma dataGrafico={this.state.resultado.dados} nomeLegenda={this.state.resultado.variavel} />}
										</div>
										<div className="col-md-6 col-sm-12">
											<div className="table-responsive">
												<Tabela resultado={this.state.resultado} {...this.props} handleUp={this.handleUp.bind(this)} handleDown={this.handleDown.bind(this)} />
											</div>
										</div>
									</div>
									<div className="row">
										<button onClick={() => this.setState({ resultado: {} })} className="btn btn-outline-secondary btn-custom" id="btnVoltar">
											VOLTAR
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Descritiva;
