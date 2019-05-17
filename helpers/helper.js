import { Notifications, Permissions } from 'expo'

export function criarNotificacaoLocal(notificacao){
	return {
		title: notificacao.titulo,
		body: notificacao.corpo,
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	}
}

export function setarNotificacaoLocal(notificacao){
	Permissions.askAsync(Permissions.NOTIFICATIONS)
		.then(({status}) => {
			if(status === 'granted'){
				console.log(notificacao.data)
				let time = new Date(notificacao.data)
				console.log('time', time)
				let dataAjustada = time.getTime() + 10000
				console.log('dataAjustada', dataAjustada)
				Notifications.scheduleLocalNotificationAsync(
					criarNotificacaoLocal(notificacao),
					{
						time: dataAjustada
					}
				).then(resultado => console.log('notificacao', resultado))
			}
		})
}

export const sendNotificationImmediately = async () => {
	let notificationId = await Notifications.presentLocalNotificationAsync({
		title: 'This is crazy',
		body: 'Your mind will blow after reading this',
	});
	console.log(notificationId); // can be saved in AsyncStorage or send to server
};

export const scheduleNotification = async () => {
	let notificationId = Notifications.scheduleLocalNotificationAsync(
		{
			title: "I'm Scheduled",
			body: 'Wow, I can show up even when app is closed',
		},
		{
			repeat: 'minute',
			time: new Date().getTime() + 10000,
		},
	);
	console.log(notificationId);
}

export const cancelarTodasNotificacoes = () => {
	Notifications.dismissAllNotificationsAsync() 
	console.log('cancelando todas notificacoes')
}

export function pegarDataEHoraAtual(){
	let dados = []
	const dataAtual = new Date()
	const diaParaDataDeCriacao = dataAtual.getDate().toString().padStart(2, '0')
	let mesParaDataDeCriacao = dataAtual.getMonth()+1
	mesParaDataDeCriacao = mesParaDataDeCriacao.toString().padStart(2, '0')
	const anoParaDataDeCriacao = dataAtual.getFullYear()
	const dataDeCriacao = diaParaDataDeCriacao + '/' + mesParaDataDeCriacao + '/' + anoParaDataDeCriacao
	const horaDeCriacao = dataAtual.getHours().toString().padStart(2, '0')
		+':'+dataAtual.getMinutes().toString().padStart(2, '0')
		+':'+dataAtual.getSeconds().toString().padStart(2, '0')

	dados.push(dataDeCriacao)
	dados.push(horaDeCriacao)

	return dados
}
