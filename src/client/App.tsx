import * as React from 'react';
import { useState, useEffect } from 'react';
import { Plugins } from "@capacitor/core"

const { Storage } = Plugins;
const { Toast } = Plugins;

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState<string>('');

	useEffect(() => {
		async function getGreeting() {
			try {
				const res = await fetch('/api/hello');
				const greeting = await res.json();
				setGreeting(greeting);
			} catch (error) {
				console.log(error);
			}
		}
		getGreeting();
	}, []);

	async function toggleNativeLogin() {
		await Storage.set({
			key: "signUp",
			value: "true"
		})
	}

	async function getItem() {
		const { value } = await Storage.get({ key: 'signUp' });
		alert(`Got item: ${value}`);
	}

	async function showToast() {
		await Toast.show({
			text: "Hellow there Toast!"
		})
	}

	const onSignUpClick = (e: React.FormEvent) => {
		e.preventDefault();
		showToast();
		toggleNativeLogin();
		console.log("Value set")
	}

	const getValueClick = (e: React.FormEvent) => {
		e.preventDefault();
		getItem();
		console.log("gotten")
	}

	return (
		<main className="container my-5">
			<h1 className="text-primary text-center">Clicking button should set Storage and pop Toast</h1>
			<button onClick={onSignUpClick}>Set Value and Toast</button>
			<button onClick={getValueClick}>Get Value</button>
		</main>
	);
};

interface AppProps {}

export default App;
