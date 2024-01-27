/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./auth/lucia").Auth;
	type DatabaseUserAttributes = {
		name: string;
		email: string | null;
		image: string;
	};
	type DatabaseSessionAttributes = {};
}
