// imports
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),

		  FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		  }),

		// // Email Provider
		// EmailProvider({
		// 	server: {
		// 		host: process.env.EMAIL_SERVER_HOST,
		// 		port: process.env.EMAIL_SERVER_PORT,
		// 		auth: {
		// 		user: process.env.EMAIL_SERVER_USER,
		// 		pass: process.env.EMAIL_SERVER_PASSWORD,
		// 		},
		// 	},
		// 	from: process.env.EMAIL_FROM,
		// }),
    ]
})

export { handler as GET, handler as POST }