import { startRegistration } from '@simplewebauthn/browser';

// const optionsJSONExample = {
// 	challenge: 'wdGplMrQnZxu9RUKI4JJRw0V39D5BbFVlffsKWXO5Mk',
// 	rp: {
// 		name: 'WebAuthn Example',
// 		id: 'localhost',
// 	},
// 	user: {
// 		id: 'oi9cC8sVylng04qUZFGYK_ymc3UFNBknfe69gvw1OAw',
// 		name: 'test@gmail.com',
// 		displayName: 'Test User',
// 	},
// 	pubKeyCredParams: [
// 		{
// 			alg: -7,
// 			type: 'public-key',
// 		},
// 		{
// 			alg: -257,
// 			type: 'public-key',
// 		},
// 	],
// 	timeout: 60000,
// 	attestation: 'none',
// 	excludeCredentials: [],
// 	authenticatorSelection: {
// 		residentKey: 'preferred',
// 		userVerification: 'preferred',
// 		authenticatorAttachment: 'platform',
// 		requireResidentKey: false,
// 	},
// 	extensions: {
// 		credProps: true,
// 	},
// 	hints: [],
// };
//
// const registrationResponse = {
// 	id: 'Mf-FX2_vqhzVPEaQ2GV0QUcibBE',
// 	rawId: 'Mf-FX2_vqhzVPEaQ2GV0QUcibBE',
// 	response: {
// 		attestationObject:
// 			'o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YViYSZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NdAAAAAPv8MAcVTk7MjAtuAgVX170AFDH_hV9v76oc1TxGkNhldEFHImwRpQECAyYgASFYIDd5s4GIMAWwY3MzZwKNl9FwkAUPDOCmmnFVot1zyr6TIlggkRfKhN3cLI1dJDHpAVlzFZS2ZFJWjnpC6aVCeGC8hqw',
// 		clientDataJSON:
// 			'eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiVGFNRGJUWUhReXBSMExZaktTa0ItdXdSMkVNS05WRU1VM2J3YTJxVWhBNCIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImNyb3NzT3JpZ2luIjpmYWxzZX0',
// 		transports: ['hybrid', 'internal'],
// 		publicKeyAlgorithm: -7,
// 		publicKey:
// 			'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEN3mzgYgwBbBjczNnAo2X0XCQBQ8M4KaacVWi3XPKvpORF8qE3dwsjV0kMekBWXMVlLZkUlaOekLppUJ4YLyGrA',
// 		authenticatorData:
// 			'SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NdAAAAAPv8MAcVTk7MjAtuAgVX170AFDH_hV9v76oc1TxGkNhldEFHImwRpQECAyYgASFYIDd5s4GIMAWwY3MzZwKNl9FwkAUPDOCmmnFVot1zyr6TIlggkRfKhN3cLI1dJDHpAVlzFZS2ZFJWjnpC6aVCeGC8hqw',
// 	},
// 	type: 'public-key',
// 	clientExtensionResults: {
// 		credProps: {
// 			rk: true,
// 		},
// 	},
// 	authenticatorAttachment: 'platform',
// };

export function useWebAuth() {
	const toast = useToast();

	const optionsJSON = ref();
	const registrationResponse = ref();
	const verificationResponse = ref();

	async function generateRegistrationOptions(body: { id: number; email: string }) {
		optionsJSON.value = await $fetch('/webauth/generate-registration-options', {
			method: 'post',
			body,
		});

		try {
			registrationResponse.value = await startRegistration({ optionsJSON: optionsJSON.value });
		} catch (error) {
			if (error instanceof Error) {
				if (error.name === 'InvalidStateError') {
					toast.add({
						title: 'Error',
						description: "'Error: Authenticator was probably already registered by user'",
						color: 'error',
					});
				} else {
					toast.add({
						title: 'Error',
						description: error.message || 'Error',
						color: 'error',
					});
				}
			}

			throw error;
		}

		verificationResponse.value = await $fetch('/webauth/verify-registration', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				regRes: registrationResponse.value,
				optRes: optionsJSON.value,
			},
		});
	}

	return {
		optionsJSON,
		registrationResponse,
		verificationResponse,
		generateRegistrationOptions,
	};
}
