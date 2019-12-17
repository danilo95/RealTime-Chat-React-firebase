import React, { Component } from 'react';
import firebase from 'firebase';

var firebaseConfig = {
	apiKey: 'AIzaSyDiP80spybysa6XJOcvHPnoEKMJOx3NKuQ',
	authDomain: 'chat-test-dc3e2.firebaseapp.com',
	databaseURL: 'https://chat-test-dc3e2.firebaseio.com',
	projectId: 'chat-test-dc3e2',
	storageBucket: 'chat-test-dc3e2.appspot.com',
	messagingSenderId: '782282843747',
	appId: '1:782282843747:web:ec56d72a524d3ce6aa3a56',
	measurementId: 'G-MNTVP111ZY'
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Chat extends Component {
	constructor() {
		super();
		this.state = {
			inputMessage: '',
			messages: []
		};
	}

	componentDidMount() {
		firebaseApp
			.database()
			.ref('messages/')
			.on('value', snapshot => {
				const currentMessages = snapshot.val();
				if (currentMessages !== null) {
					this.setState({ messages: currentMessages });
				}
			}); //defini que se guardaran en una colecion llamada messages y que cuando cambie un valor tome un snapshopt de estos y hago un callback
	}

	handleSubmit = e => {
		e.preventDefault();
		const newMessage = {
			id: this.state.messages.length,
			text: this.state.inputMessage
		};
		firebaseApp
			.database()
			.ref(`messages/${newMessage.id}`)
			.set(newMessage);

		this.setState({ inputMessage: '' });
	};

	handleMessage = e => {
		this.setState({ inputMessage: e.target.value });
	};

	render() {
		const { messages } = this.state;
		const listOfMessages = messages.map(message => {
			return <li key={message.id}>{message.text}</li>;
		});
		return (
			<div>
				<ul>{listOfMessages}</ul>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						onChange={this.handleMessage}
						value={this.state.inputMessage}
					></input>
					<button>Send</button>
				</form>
			</div>
		);
	}
}
