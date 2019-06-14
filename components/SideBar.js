import React from 'react'
import { Button } from 'native-base'
import { Alert, View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './ProspectoStyle'
import { connect } from 'react-redux'
import {
	alterarUsuarioNoAsyncStorage,
} from '../actions'
import {
	sendNotificationImmediately,
	scheduleNotification,
	cancelarTodasNotificacoes,
} from '../helpers/helper'
import { LinearGradient } from 'expo'
import { dark, black, lightdark, white } from '../helpers/colors';
import { Icon } from 'react-native-elements';

class SideBar extends React.Component {

	sair = () => {
		const {
			alterarUsuarioNoAsyncStorage,
			navigation,
		} = this.props
		const usuario = {}
		alterarUsuarioNoAsyncStorage(usuario)
			.then(() => {
				this.props.closeDrawer()
				navigation.navigate('Login')
				Alert.alert('Sair', 'Você deslogou!')
			})
	}

	render() {
		return (
			<LinearGradient style={{ flex: 1 }} colors={[black, dark, lightdark, '#343434', 'rgba(52, 52, 52, 0.9)']}>
				<View style={styles.sideMenu}>
					<Image style={styles.imgLogo} source={require('../assets/images/logo.png')} />

					<View style={{marginTop: 10, }}>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Perfil')}
							style={{ flexDirection: 'row', alignItems: 'center', }}
						>
							<Icon
								name="user"
								size={22}
								type="font-awesome"
								color={white}
								containerStyle={{ marginRight: 6 }}
							/>
							<Text style={styles.textMenu}>
								Perfil
                        </Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => sendNotificationImmediately()}
							style={{ flexDirection: 'row', alignItems: 'center', }}
						>
							<Icon
								name="user"
								size={22}
								type="font-awesome"
								color={white}
								containerStyle={{ marginRight: 6 }}
							/>
							<Text style={styles.textMenu}>
								agora
                        </Text>
						</TouchableOpacity>
						<View >
							<TouchableOpacity
								onPress={() => scheduleNotification()}
								style={{ flexDirection: 'row', alignItems: 'center', }}
							>
								<Icon
									name="file"
									size={22}
									type="font-awesome"
									color={white}
									containerStyle={{ marginRight: 6 }}
								/>
								<Text style={styles.textMenu}>
									5 segundos
                        	</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							onPress={() => cancelarTodasNotificacoes()}
							style={{ flexDirection: 'row', alignItems: 'center', }}
						>
							<Icon
								name="power-off"
								size={22}
								type="font-awesome"
								color={white}
								containerStyle={{ marginRight: 6 }}
							/>
							<Text style={styles.textMenu}>
								Cancelar
                        </Text>
						</TouchableOpacity>


						<TouchableOpacity
							onPress={() => this.sair()}
							style={{ flexDirection: 'row', alignItems: 'center', }}
						>
							<Icon
								name="power-off"
								size={22}
								type="font-awesome"
								color={white}
								containerStyle={{ marginRight: 6 }}
							/>
							<Text style={styles.textMenu}>
								Sair
                        </Text>
						</TouchableOpacity>
					</View>

				</View>
			</LinearGradient>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		alterarUsuarioNoAsyncStorage: (usuario) => dispatch(alterarUsuarioNoAsyncStorage(usuario))
	}
}

export default connect(null, mapDispatchToProps)(SideBar)
