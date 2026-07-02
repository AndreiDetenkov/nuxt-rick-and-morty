import type {
	AuthenticatorTransportFuture,
	CredentialDeviceType,
	Base64URLString,
	PublicKeyCredentialCreationOptionsJSON,
} from '@simplewebauthn/server';

import { generateRegistrationOptions } from '@simplewebauthn/server';

type UserModel = {
	id: number;
	email: string;
};

/**
 * It is strongly advised that credentials get their own DB
 * table, ideally with a foreign key somewhere connecting it
 * to a specific UserModel.
 */
type Passkey = {
	// SQL: Store as `TEXT`. Index this column
	id: Base64URLString;
	// SQL: Store raw bytes as `BYTEA`/`BLOB`/etc...
	//      Caution: Node ORM's may map this to a Buffer on retrieval,
	//      convert to Uint8Array as necessary
	publicKey: Uint8Array;
	// SQL: Foreign Key to an instance of your internal user model
	user: UserModel;
	// SQL: Store as `TEXT`. Index this column. A UNIQUE constraint on
	//      (webAuthnUserID + user) also achieves maximum user privacy
	webauthnUserID: Base64URLString;
	// SQL: Consider `BIGINT` since some authenticators return atomic timestamps as counters
	counter: number;
	// SQL: `VARCHAR(32)` or similar, longest possible value is currently 12 characters
	// Ex: 'singleDevice' | 'multiDevice'
	deviceType: CredentialDeviceType;
	// SQL: `BOOL` or whatever similar type is supported
	backedUp: boolean;
	// SQL: `VARCHAR(255)` and store string array as a CSV string
	// Ex: ['ble' | 'cable' | 'hybrid' | 'internal' | 'nfc' | 'smart-card' | 'usb']
	transports?: AuthenticatorTransportFuture[];
};

/** Mock function */
function getUserPasskeys(userId: number): Passkey[] {
	userId.toString();
	return [];
}

export default defineEventHandler(async (event) => {
	const body: { id: number; email: string } = await readBody(event);

	// (Pseudocode) Retrieve the user from the database after they've logged in
	// const user: UserModel = getUserFromDB(loggedInUserId);

	// (Pseudocode) Retrieve any of the user's previously-registered authenticators
	const userPasskeys: Passkey[] = getUserPasskeys(body.id);

	const options: PublicKeyCredentialCreationOptionsJSON = await generateRegistrationOptions({
		/** Human-readable title for your website */
		rpName: 'WebAuthn Example',
		/** A unique identifier for your website. 'localhost' is okay for local dev */
		rpID: 'localhost',
		userName: body.email, // user.email
		userDisplayName: 'Test User', // user.name
		timeout: 60000,
		attestationType: 'none',
		// Prevent users from re-registering existing authenticators
		excludeCredentials: userPasskeys.map((passkey) => ({
			id: passkey.id,
			type: 'public-key',
			// Optional
			transports: passkey.transports,
		})),
		authenticatorSelection: {
			residentKey: 'preferred',
			userVerification: 'preferred',
			// Optional
			authenticatorAttachment: 'platform',
		},
		supportedAlgorithmIDs: [-7, -257],
	});

	// Save challenge in database

	return options;
});
