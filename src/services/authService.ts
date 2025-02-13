import { error } from "elysia";
import { UserRepository } from "../repositories/userRepository";

export class AuthService {
  private readonly UserRepository: UserRepository = new UserRepository();

  signUp = async ({ body }: { body: any }) => {
    try {
      const { email, password, user_name, user_image } = body;
      // check value body
      if (!email || !password || !user_name) {
        return {
          status: "F",
          error: "email or password or user_name is missing", // we choose handle each case ***
        };
      }
      // hash password use bcrypt
      const hashedPassword = await this.hashpassword(password);
      // check email and username already exsist
      const emailExist = await this.UserRepository.find({ email: email });
      const usernameExist = await this.UserRepository.find({
        user_name: user_name,
      });

      if (emailExist) {
        return { status: "F", error: "Email already registered" };
      }

      if (usernameExist) {
        return { status: "F", error: "Username already registered" };
      }

      // create new user
      const newUser = await this.UserRepository.create({
        user_name,
        user_image: user_image ? user_image : "",
        email,
        password: hashedPassword,
      });

      return {
        status: "S",
        message: "User create successfully",
        data: { newUser },
      };
    } catch (e) {
      console.error("Error creating user:", e);
      return {
        status: "F",
        message: "Failed to create user. Please try again.",
        error: e,
      };
    }
  };

  signIn = async ({ body, jwt, set }: { body: any; jwt: any; set:any }) => {
    const { user_name, password } = body;
    try {
      if (!user_name || !password) {
        return {
          status: "F",
          error: "Username or password is missing", // we choose handle each case ***
        };
      }
      // check email and username already exsist
      const userData = await this.UserRepository.find({
        user_name: user_name,
      });
      if (!userData) {
        return { status: "F", error: "Username does not exist" };
      }
      console.log("userData", userData)
      // vertify password use bcrypt
      const vertifyPassword = await this.vertifyPassword(
        password,
        userData.password
      );
      if (!vertifyPassword) {
        return { status: "F", error: "Password is incorrect" };
      }

      // token JWT userData
      const token = await jwt.sign({ id: userData?.id }, { expiresIn: "7d" });

      // Set the token as cookie or we can use from front end (localStorage way) (coppy from deepseek)
      set.cookie = {
        auth: {
          value: token,
          httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
          maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
          path: "/", // Accessible across the entire site
          // secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
          sameSite: "strict", // Prevent CSRF attacks
        },
      };

      return {
        status: "S",
        message: "User login successfully",
        data: { token },
      };
    } catch (e) {
      console.error("Error vertify user:", e);
      return {
        status: "F",
        message: "Failed to vertify user. Please try again.",
        error: e,
      };
    }
  };

  private async hashpassword(password: string) {
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 4,
    });
    return hashedPassword;
  }

  private async vertifyPassword(password: string, passwordDB: string) {
    const isMatch = await Bun.password.verify(password, passwordDB);

    return isMatch;
  }
}
