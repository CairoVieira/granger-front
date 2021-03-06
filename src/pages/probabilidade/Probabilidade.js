import React, { Component } from "react";
import Menu from "../../components/Menu";
import { menu, mask } from "../../javascript/Scripts";
import Axios from "axios";
import { URL } from "../../config/config";

import { verificaUsuarioLogado } from "../../javascript/Scripts";
import history from "../../History";

class Probabilidade extends Component {
	constructor(props) {
		super(props);

		this.state = {
			resultados: {},
			binomial: {
				sucesso: "",
				fracasso: "",
				amostra: "",
				tipo: "exatamente",
				evento: "",
			},
			normal: {
				media: "",
				desvio: "",
				intervalo: "menor",
				valor: "",
				de: "",
				para: "",
			},
			uniforme: {
				minimo: "",
				maximo: "",
				valor: "",
				intervalo: "menor",
				de: "",
				ate: "",
			},
		};

		this.handleBinomialTipoEvento = this.handleBinomialTipoEvento.bind(this);
		this.handleIntervalorNormal = this.handleIntervalorNormal.bind(this);
		this.handleIntervaloUniforme = this.handleIntervaloUniforme.bind(this);
	}
	componentDidMount() {
		menu();
		mask();

		if (!verificaUsuarioLogado()) history.push("/login");
	}

	async calcularBinomial(e) {
		e.preventDefault();
		const n = this.state.binomial.amostra;
		const p = this.state.binomial.sucesso.split(",").join(".");
		const q = this.state.binomial.fracasso.split(",").join(".");
		const k = this.state.binomial.evento;
		const tipo = this.state.binomial.tipo;
		const body = JSON.stringify({
			n,
			p,
			q,
			k,
			tipo,
		});
		let header = {
			"Content-type": "application/json",
		};
		await Axios.post(`${URL}/probabilidade/binomial`, body, { headers: header })
			.then((response) => {
				this.setState({
					resultados: {
						dados: response.data.dados,
						tipo: "binomial",
					},
				});
			})
			.catch((erro) => alert("Ocorreu um erro no processamento."));
	}

	async calcularNormal(e) {
		e.preventDefault();
		const valor = this.state.normal.valor.split(",").join(".");
		const media = this.state.normal.media.split(",").join(".");
		const desvio = this.state.normal.desvio.split(",").join(".");
		const de = this.state.normal.de.split(",").join(".");
		const para = this.state.normal.para.split(",").join(".");
		const intervalo = this.state.normal.intervalo;
		const body = JSON.stringify({
			valor,
			media,
			desvio,
			intervalo,
			de,
			para,
		});
		let header = {
			"Content-type": "application/json",
		};
		await Axios.post(`${URL}/probabilidade/normal`, body, { headers: header })
			.then((response) => {
				this.setState({
					resultados: {
						dados: response.data.dados,
						tipo: "normal",
					},
				});
			})
			.catch((erro) => alert("Ocorreu um erro no processamento."));
	}

	async calcularUniforme(e) {
		e.preventDefault();
		const valor = this.state.uniforme.valor.split(",").join(".");
		const minimo = this.state.uniforme.minimo.split(",").join(".");
		const maximo = this.state.uniforme.maximo.split(",").join(".");
		const de = this.state.uniforme.de.split(",").join(".");
		const ate = this.state.uniforme.ate.split(",").join(".");
		const intervalo = this.state.uniforme.intervalo;
		const body = JSON.stringify({
			valor,
			minimo,
			maximo,
			intervalo,
			de,
			ate,
		});
		let header = {
			"Content-type": "application/json",
		};
		await Axios.post(`${URL}/probabilidade/uniforme`, body, { headers: header })
			.then((response) => {
				this.setState({
					resultados: {
						dados: response.data.dados,
						tipo: "uniforme",
					},
				});
			})
			.catch((erro) => alert("Ocorreu um erro no processamento."));
	}

	handleOnChange(e) {
		const newValue = Number(e.target.value.split(",").join("."));
		if (e.target.id === "sucesso") {
			const fracasso = parseFloat(1 - newValue)
				.toPrecision(2)
				.toString()
				.split(".")
				.join(",");
			this.setState({
				binomial: {
					...this.state.binomial,
					sucesso: e.target.value,
					fracasso: fracasso,
				},
			});
		}
		if (e.target.id === "fracasso") {
			const sucesso = parseFloat(1 - newValue)
				.toPrecision(2)
				.toString()
				.split(".")
				.join(",");
			this.setState({
				binomial: {
					...this.state.binomial,
					sucesso: sucesso,
					fracasso: e.target.value,
				},
			});
		}
		if (e.target.id === "amostra") {
			this.setState({
				binomial: {
					...this.state.binomial,
					amostra: e.target.value,
				},
			});
		}
		if (e.target.id === "evento") {
			this.setState({
				binomial: {
					...this.state.binomial,
					evento: e.target.value,
				},
			});
		}
		if (e.target.id === "normalMedia") {
			this.setState({
				normal: {
					...this.state.normal,
					media: e.target.value,
				},
			});
		}
		if (e.target.id === "normalDesvio") {
			this.setState({
				normal: {
					...this.state.normal,
					desvio: e.target.value,
				},
			});
		}
		if (e.target.id === "normalValor") {
			this.setState({
				normal: {
					...this.state.normal,
					valor: e.target.value,
				},
			});
		}
		if (e.target.id === "normalValorDe") {
			this.setState({
				normal: {
					...this.state.normal,
					de: e.target.value,
				},
			});
		}
		if (e.target.id === "normalValorPara") {
			this.setState({
				normal: {
					...this.state.normal,
					para: e.target.value,
				},
			});
		}
		if (e.target.id === "uniformeMinimo") {
			this.setState({
				uniforme: {
					...this.state.uniforme,
					minimo: e.target.value,
				},
			});
		}
		if (e.target.id === "uniformeMaximo") {
			this.setState({
				uniforme: {
					...this.state.uniforme,
					maximo: e.target.value,
				},
			});
		}
		if (e.target.id === "uniformeValor") {
			this.setState({
				uniforme: {
					...this.state.uniforme,
					valor: e.target.value,
				},
			});
		}
		if (e.target.id === "uniformeValorDe") {
			this.setState({
				uniforme: {
					...this.state.uniforme,
					de: e.target.value,
				},
			});
		}
		if (e.target.id === "uniformeValorAte") {
			this.setState({
				uniforme: {
					...this.state.uniforme,
					ate: e.target.value,
				},
			});
		}
	}

	handleBinomialTipoEvento(e) {
		this.setState({
			binomial: {
				...this.state.binomial,
				tipo: e.target.name,
			},
		});
	}

	handleIntervalorNormal(e) {
		this.setState({
			normal: {
				...this.state.normal,
				intervalo: e.target.name,
			},
		});
	}

	handleIntervaloUniforme(e) {
		this.setState({
			uniforme: {
				...this.state.uniforme,
				intervalo: e.target.name,
			},
		});
	}

	render() {
		return (
			<div className="background">
				<Menu />
				<div className="container-fluid">
					{!this.state.resultados.dados && (
						<div className="row">
							<div className="col-md-12 col-sm-12">
								<div className="form-custom formulario">
									<ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
										<li className="nav-item" role="presentation">
											<a className="nav-link text-secondary active" id="binomial-tab" data-toggle="tab" href="#binomial" role="tab" aria-controls="binomial" aria-selected="true">
												Binomial
											</a>
										</li>
										<li className="nav-item" role="presentation">
											<a className="nav-link text-secondary" id="normal-tab" data-toggle="tab" href="#normal" role="tab" aria-controls="normal" aria-selected="false">
												Normal
											</a>
										</li>
										<li className="nav-item" role="presentation">
											<a className="nav-link text-secondary" id="uniforme-tab" data-toggle="tab" href="#uniforme" role="tab" aria-controls="uniforme" aria-selected="false">
												Uniforme
											</a>
										</li>
									</ul>
									<div className="tab-content" id="myTabContent">
										<div className="tab-pane fade show active " id="binomial" role="tabpanel" aria-labelledby="binomial-tab">
											<form onSubmit={this.calcularBinomial.bind(this)}>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="amostra"
															placeholder="Informe o valor da Amostra (N)"
															className="form-control numerico"
															required
															value={this.state.binomial.amostra}
															onChange={(e) => this.handleOnChange(e)}
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="sucesso"
															placeholder="Informe o valor do Sucesso (p) em decimal"
															className="form-control"
															required
															value={this.state.binomial.sucesso}
															onChange={(e) => this.handleOnChange(e)}
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="fracasso"
															placeholder="Informe o valor do Fracasso (q) em decimal"
															className="form-control"
															required
															value={this.state.binomial.fracasso}
															onChange={(e) => this.handleOnChange(e)}
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="evento"
															value={this.state.binomial.evento}
															onChange={(e) => this.handleOnChange(e)}
															placeholder="Informe o valor do Evento (K) separado por ';'"
															className="form-control"
															required
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row mt-0.5">
													<div className="col-12 text-center">
														<input type="submit" className="btn btn-outline-secondary btn-custom" id="btnCalcular" value="Calcular"></input>
													</div>
												</div>
											</form>
										</div>

										<div className="tab-pane fade" id="normal" role="tabpanel" aria-labelledby="normal-tab">
											<form onSubmit={(e) => this.calcularNormal(e)}>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="normalMedia"
															value={this.state.normal.media}
															onChange={(e) => this.handleOnChange(e)}
															placeholder="Informe a média"
															className="form-control"
															required
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="normalDesvio"
															value={this.state.normal.desvio}
															onChange={(e) => this.handleOnChange(e)}
															placeholder="Informe o desvio padrão"
															className="form-control"
															required
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row">
													<div className="form-group col-12 text-center d-flex flex-column">
														<div className="btn-group btn-group-toggle" data-toggle="buttons">
															<label className="btn btn-secondary">
																Menor
																<input type="radio" defaultChecked name="menor" onClick={(e) => this.handleIntervalorNormal(e)}></input>
															</label>
															<label className="btn btn-secondary active">
																Entre
																<input type="radio" name="entre" onClick={(e) => this.handleIntervalorNormal(e)}></input>
															</label>
															<label className="btn btn-secondary">
																Maior
																<input type="radio" name="maior" onClick={(e) => this.handleIntervalorNormal(e)}></input>
															</label>
														</div>
													</div>
												</div>
												{this.state.normal.intervalo === "entre" && (
													<div className="form-row">
														<div className="form-group col-6">
															<input
																type="text"
																id="normalValorDe"
																value={this.state.normal.de}
																onChange={(e) => this.handleOnChange(e)}
																placeholder="De"
																className="form-control"
																required
																autoComplete="off"
															/>
														</div>
														<div className="form-group col-6">
															<input
																type="text"
																id="normalValorPara"
																value={this.state.normal.para}
																onChange={(e) => this.handleOnChange(e)}
																placeholder="Até"
																className="form-control"
																required
																autoComplete="off"
															/>
														</div>
													</div>
												)}
												{this.state.normal.intervalo !== "entre" && (
													<div className="form-row">
														<div className="form-group col-12">
															<input
																type="text"
																id="normalValor"
																value={this.state.normal.valor}
																onChange={(e) => this.handleOnChange(e)}
																placeholder="Informe o valor a ser calculado"
																className="form-control"
																required
																autoComplete="off"
															/>
														</div>
													</div>
												)}

												<div className="form-row mt-0.5">
													<div className="col-12 text-center">
														<input type="submit" className="btn btn-outline-secondary btn-custom" id="btnCalcular" value="Calcular"></input>
													</div>
												</div>
											</form>
										</div>

										<div className="tab-pane fade" id="uniforme" role="tabpanel" aria-labelledby="uniforme-tab">
											<form onSubmit={(e) => this.calcularUniforme(e)}>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="uniformeMinimo"
															value={this.state.uniforme.minimo}
															onChange={(e) => this.handleOnChange(e)}
															placeholder="Informe o valor do ponto mínimo"
															className="form-control"
															required
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row">
													<div className="form-group col-12">
														<input
															type="text"
															id="uniformeMaximo"
															value={this.state.uniforme.maximo}
															onChange={(e) => this.handleOnChange(e)}
															placeholder="Informe o valor do ponto máximo"
															className="form-control"
															required
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="form-row">
													<div className="form-group col-12 text-center d-flex flex-column">
														<div className="btn-group btn-group-toggle" data-toggle="buttons">
															<label className="btn btn-secondary">
																Menor
																<input type="radio" name="menor" defaultChecked onClick={(e) => this.handleIntervaloUniforme(e)}></input>
															</label>
															<label className="btn btn-secondary active">
																Entre
																<input type="radio" name="entre" onClick={(e) => this.handleIntervaloUniforme(e)}></input>
															</label>
															<label className="btn btn-secondary">
																Maior
																<input type="radio" name="maior" onClick={(e) => this.handleIntervaloUniforme(e)}></input>
															</label>
														</div>
													</div>
												</div>
												{this.state.uniforme.intervalo !== "entre" && (
													<div className="form-row">
														<div className="form-group col-12">
															<input
																type="text"
																id="uniformeValor"
																value={this.state.uniforme.valor}
																onChange={(e) => this.handleOnChange(e)}
																placeholder="Informe o valor"
																className="form-control"
																required
																autoComplete="off"
															/>
														</div>
													</div>
												)}
												{this.state.uniforme.intervalo === "entre" && (
													<div className="form-row">
														<div className="form-group col-6">
															<input
																type="text"
																id="uniformeValorDe"
																value={this.state.uniforme.de}
																onChange={(e) => this.handleOnChange(e)}
																placeholder="De"
																className="form-control"
																required
																autoComplete="off"
															/>
														</div>
														<div className="form-group col-6">
															<input
																type="text"
																id="uniformeValorAte"
																value={this.state.uniforme.ate}
																onChange={(e) => this.handleOnChange(e)}
																placeholder="Até"
																className="form-control"
																required
																autoComplete="off"
															/>
														</div>
													</div>
												)}
												<div className="form-row mt-0.5">
													<div className="col-12 text-center">
														<input type="submit" className="btn btn-outline-secondary btn-custom" id="btnCalcular" value="Calcular"></input>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{this.state.resultados.dados && (
						<div className="row">
							<div className="col-md-12 col-sm-12">
								<div className="form-custom formulario">
									<h1 className="text-center mb-5">Aqui está o resultado</h1>
									{(this.state.resultados.tipo === "binomial" || this.state.resultados.tipo === "uniforme") && (
										<>
											<div className="row">
												<div className="col-12">
													<p className="h3 text-center">Probabilidade: {this.state.resultados.dados.resultado}%</p>
												</div>
											</div>
											<div className="row">
												<div className="col-12">
													<p className="h3 text-center">Média: {this.state.resultados.dados.media}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-12">
													<p className="h3 text-center">Desvio Padrão: {this.state.resultados.dados.desvio}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-12">
													<p className="h3 text-center">Coeficiente de Variação: {this.state.resultados.dados.coeficiente}%</p>
												</div>
											</div>
										</>
									)}
									{this.state.resultados.tipo === "normal" && (
										<>
											<div className="row">
												<div className="col-12">
													<p className="h3 text-center">Probabilidade: {this.state.resultados.dados.resultado}%</p>
												</div>
											</div>
										</>
									)}

									<div className="form-row mt-3">
										<div className="col-12 text-center">
											<button
												style={{ maxWidth: "50%" }}
												onClick={() => {
													this.setState({ resultados: {} });
												}}
												className="btn btn-outline-secondary btn-custom"
												id="btnVoltar"
											>
												VOLTAR
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Probabilidade;
