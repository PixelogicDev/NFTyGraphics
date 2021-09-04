import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
	providers: [
		Providers.Spotify({
			scope: 'user-read-email user-top-read',
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt(token, _, account) {
			if (account) {
				token.id = account.id;
				token.accessToken = account.accessToken;
			}
			return token;
		},
		async session(session, token) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
});
