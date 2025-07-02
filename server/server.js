import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './src/typeDefs'
import {resolvers} from './src/resolvers';
import cors from 'cors';
import express from 'express';
import http from 'http';

const startApolloServer = async () => {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()

    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
    })
)

await new Promise(resolve => httpServer.listen({ port: 4000}, resolve))

console.log(`Server ready at http://localhost:4000/graphql`)

}

startApolloServer()