import { Elysia, t } from "elysia";
import { prisma } from "../../config/prisma";
import { comparePassword, hashPassword, md5hash } from "../../utils/bcrypt";
import { isAuthenticated } from "../../middlewares/userAuth";
import { UserRepository } from "../../repositories/userRepository";

const User = new UserRepository()

export const auth = (app: Elysia) =>
    app.group('/auth', (app) =>
        app
            .post(
                "/signup",
                async ({ body, set }) => {
                    const { email, name, password, username } = body;
                    // validate duplicate email address
                    const emailExists = await User.findByEmail(email);
                    if (emailExists) {
                        set.status = 400;
                        return {
                            success: false,
                            data: null,
                            message: 'Eamil already in use.',
                        };
                    }
                    // validate duplicate username
                    const usernmaeExists = await User.findByUsername(username)

                    if (usernmaeExists) {
                        set.status = 400;
                        return {
                            success:false,
                            data: null,
                            message:'Someone already taken this username.',
                        };
                    }
                    // handle password

                    const {hash,salt} = await hashPassword(password);
                    const emailHash = md5hash(email);
                    const profileImage = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

                    const newUser = await User.create({
                          name,
                          email,
                          hash,
                          salt,
                          username,
                          profileImage,
                      });

                      return {
                        success:true,
                        message:'Account created',
                        data:{
                            user:newUser,
                        },
                      };
                },
                {
                    body: t.Object({
                      name: t.String(),
                      email: t.String(),
                      username: t.String(),
                      password: t.String(),
                    }),
                  }
                )
            )
          