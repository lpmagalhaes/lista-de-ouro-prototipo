import React from 'react';
import { StyleSheet } from 'react-native';
import {
	Alert,
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	NetInfo,
	ActivityIndicator,
} from 'react-native';
import { dark, white, gray, gold, lightdark } from '../helpers/colors';
import logo from '../assets/images/logo-word.png'
import { Icon } from 'native-base';
import {
	registrarNaAPI,
} from '../helpers/api'
import {
	alterarUsuarioNoAsyncStorage,
} from '../actions'
import { connect } from 'react-redux'

class RegistroScreen extends React.Component {

	static navigationOptions = {
		headerTitle: 'Registro',
		headerTintColor: white,
	}

	state = {
		carregando: false,
		nome: 'leo',
		ddd: '61',
		telefone: '998510703',
		email: 'falecomleonardopereira@gmail.com',
		senha: '123',
	}

	ajudadorDeSubmissao = () => {
		const {
			nome,
			ddd,
			telefone,
			email,
			senha,
		} = this.state
		let camposComErro = ''
		let mostrarMensagemDeErro = false

		if (nome === '') {
			mostrarMensagemDeErro = true
			if (camposComErro === '') {
				camposComErro = 'Nome'
			}
		}

		if (ddd === '' || ddd.length !== 2) {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'DDD'
		}

		if (telefone === '' || telefone.length !== 9) {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'Telefone'
		}

		if (email === '') {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'Email'
		}

		if (senha === '') {
			mostrarMensagemDeErro = true
			if (camposComErro !== '') {
				camposComErro += ', '
			}
			camposComErro += 'Senha'
		}

		if (mostrarMensagemDeErro) {
			Alert.alert('Erro', `Campos invalidos: ${camposComErro}`)
		} else {
			try {
				NetInfo.isConnected
					.fetch()
					.then(isConnected => {
						if (isConnected) {
							this.setState({ carregando: true })
							const dados = {
								nome,
								ddd,
								telefone,
								email,
								senha,
							}
							registrarNaAPI(dados)
								.then(resposta => {
									this.setState({ carregando: false })
									if (resposta.ok) {
										const usuario = {
											email,
											senha,
										}
										this.props.alterarUsuarioNoAsyncStorage(usuario)
										Alert.alert('Registro', 'Registrado com sucesso!')
										this.props.navigation.navigate('Prospectos')
									} else {
										Alert.alert('Aviso', resposta.menssagem)
									}
								})
								.catch(error => console.log('error: ', error))
						} else {
							Alert.alert('Internet', 'Verifique sua internet!')
						}
					})
			} catch (err) {
				Alert.alert('Error', err)
			}
		}
	}

	render() {
		const {
			carregando,
			nome,
			ddd,
			telefone,
			email,
			senha,
		} = this.state
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

			{/* <View style={styles.container}> */}

				{
					carregando &&
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<ActivityIndicator
							size="large"
							color={gold}
						/>
					</View>
				}

				{
					!carregando &&
					<View>
						<View style={styles.containerLogin}>
							<View>
								<View style={{ flexDirection: 'row' }}>
									<Icon name='user' type='FontAwesome'
										style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
									/>
									<Text style={{ color: gold }}>Nome</Text>
								</View>
								<TextInput style={styles.inputText}
									keyboardAppearance='dark'
									autoCapitalize="none"
									placeholderTextColor="#d3d3d3"
									selectionColor="#fff"
									value={nome}
									onChangeText={texto => this.setState({ nome: texto })}
								/>
							</View>

							<View style={{ marginTop: 8, flexDirection: "row" }}>
								<View style={{width: 50, marginRight: 10}}>
									<View style={{ flexDirection: 'row' }}>
										<Icon name='phone' type='FontAwesome'
											style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
										/>
										<Text style={{ color: gold }}>DDD</Text>
									</View>
									<TextInput style={[styles.inputText, style={textAlign: 'center'}]}
										keyboardAppearance='dark'
										autoCapitalize="none"
										maxLength={2}
										placeholderTextColor="#d3d3d3"
										selectionColor="#fff"
										keyboardType='phone-pad'
										value={ddd}
										onChangeText={texto => this.setState({ ddd: texto })}
									/>
								</View>

								<View style={{flex:1}}>
									<View style={{ flexDirection: 'row' }}>
										{/* <Icon name='phone' type='FontAwesome'
											style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
										/> */}
										<Text style={{ color: gold }}>Telefone</Text>
									</View>
									<TextInput style={styles.inputText}
										keyboardAppearance='dark'
										autoCapitalize="none"
										placeholderTextColor="#d3d3d3"
										selectionColor="#fff"
										keyboardType='phone-pad'
										value={telefone}
										onChangeText={texto => this.setState({ telefone: texto })}
									/>
								</View>
							</View>

							<View style={{ marginTop: 8 }}>
								<View style={{ flexDirection: 'row' }}>
									<Icon name='envelope' type='FontAwesome'
										style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
									/>
									<Text style={{ color: gold }}>Email</Text>
								</View>
								<TextInput style={styles.inputText}
									keyboardAppearance='dark'
									autoCapitalize="none"
									placeholderTextColor="#d3d3d3"
									selectionColor="#fff"
									keyboardType="email-address"
									value={email}
									onChangeText={texto => this.setState({ email: texto })}
								/>
							</View>

							<View style={{ marginTop: 8 }}>
								<View style={{ flexDirection: 'row' }}>
									<Icon name='lock' type='FontAwesome'
										style={{ fontSize: 16, marginRight: 5, color: gold, marginLeft: 2 }}
									/>
									<Text style={{ color: gold }}>Senha</Text>
								</View>
								<TextInput style={styles.inputText}
									keyboardAppearance='dark'
									autoCapitalize="none"
									placeholderTextColor="#d3d3d3"
									selectionColor="#fff"
									keyboardType='default'
									secureTextEntry={true}
									value={senha}
									onChangeText={texto => this.setState({ senha: texto })}
								/>
							</View>

						</View>
						<TouchableOpacity style={styles.button} onPress={() => this.ajudadorDeSubmissao()}>
							<Text style={styles.textButton}>Registrar</Text>
						</TouchableOpacity>

					</View>
				}

			{/* </View> */}
					</KeyboardAvoidingView>

		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario)),
	}
}

export default connect(null, mapDispatchToProps)(RegistroScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: dark,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	logo: {
		alignSelf: 'center',
		width: 205,
		height: 120,
	},
	containerLogin: {
		height: 280,
		margin: 12,
		backgroundColor: lightdark,
		borderRadius: 10,
		justifyContent: 'center',
		padding: 14,
	},
	inputText: {
		paddingVertical: 5,
		fontSize: 16,
		color: white,
		borderRadius: 6,
		fontWeight: '400',
		borderBottomWidth: 1,
		borderBottomColor: white,

	},
	button: {
		backgroundColor: gold,
		height: 50,
		borderRadius: 10,
		justifyContent: 'center',
		margin: 12,
	},
	textButton: {
		fontSize: 16,
		color: white,
		textAlign: 'center',
	}
})

