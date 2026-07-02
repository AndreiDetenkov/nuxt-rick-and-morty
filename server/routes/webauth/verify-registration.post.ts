import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';

export default defineEventHandler(async (event) => {
	const { regRes, optRes } = await readBody(event);

	// (Pseudocode) Retrieve the logged-in user
	// const user: UserModel = getUserFromDB(loggedInUserId);

	// (Pseudocode) Get `options.challenge` that was saved above
	function getCurrentRegistrationOptions(optRes: PublicKeyCredentialCreationOptionsJSON) {
		return optRes;
	}

	const currentOptions: PublicKeyCredentialCreationOptionsJSON =
		getCurrentRegistrationOptions(optRes);

	let verification;

	try {
		verification = await verifyRegistrationResponse({
			response: regRes,
			expectedChallenge: currentOptions.challenge,
			expectedOrigin: 'http://localhost:3000',
			expectedRPID: 'localhost',
		});
	} catch (error) {
		console.error({ error });
		return { verified: false };
	}

	return { verified: verification.verified };

	// const { registrationInfo } = verification;
	// const { credential, credentialDeviceType, credentialBackedUp } = registrationInfo;
	//
	// const newPasskey: Passkey = {
	// 	// `user` here is from Step 2
	// 	user,
	// 	// Created by `generateRegistrationOptions()` in Step 1
	// 	webAuthnUserID: currentOptions.user.id,
	// 	// A unique identifier for the credential
	// 	id: credential.id,
	// 	// The public key bytes, used for subsequent authentication signature verification
	// 	publicKey: credential.publicKey,
	// 	// The number of times the authenticator has been used on this site so far
	// 	counter: credential.counter,
	// 	// How the browser can talk with this credential's authenticator
	// 	transports: credential.transports,
	// 	// Whether the passkey is single-device or multi-device
	// 	deviceType: credentialDeviceType,
	// 	// Whether the passkey has been backed up in some way
	// 	backedUp: credentialBackedUp,
	// };
	//
	// (Pseudocode) Save the authenticator info so that we can
	// get it by user ID later
	// saveNewPasskeyInDB(newPasskey);
});
