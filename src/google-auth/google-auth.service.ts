import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { CodeDto } from "./dto";

@Injectable()
export class GoogleAuthService {
  config = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
  };

  oAuth2Client = new OAuth2Client(
    this.config.client_id,
    this.config.client_secret,
    this.config.redirect_uri,
  );

  async verifyCode(dto: CodeDto) {
    console.debug(
      "[google-auth.service.ts][Line 20] process.env =====",
      process.env,
      this.config,
    );
    try {
      const { tokens } = await this.oAuth2Client.getToken(dto.code); // exchange code for tokens
      console.log(tokens);

      const userProfile = await this.oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: this.config.client_id,
      });

      console.debug(
        "[google-auth.service.ts][Line 38] userProfile =====",
        userProfile,
      );

      return { tokens, userProfile };
    } catch (error) {
      console.debug(
        "[google-auth.service.ts][Line 35] error.message =====",
        error,
      );
      throw error;
    }
  }
}
