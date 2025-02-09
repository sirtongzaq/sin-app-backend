import { Elysia, env } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { auth } from './service/user/userAuthSevice';
import jwt from '@elysiajs/jwt';
import cookie from '@elysiajs/cookie';

const app = new Elysia()
    .use(jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET || '',
    }))
    .use(cookie())
    .use(
        swagger({
            documentation: {
                info: {
                    title: 'Sin_App API Endpoint',
                    version: '1.0.0',
                },
            },
        })
    )
    .group('/api', (app) => app.use(auth))
    .listen(3000);

console.log(`🚀 Server is running at http://localhost:3000`);