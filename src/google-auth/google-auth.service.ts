import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { CodeDto } from "./dto";

const config = {
  client_id:
    "96017845217-hdn8nd4q4pfr7j1oec2725h8u8m5h16v.apps.googleusercontent.com",
  project_id: "conductor-ui-389203",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: "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",
  redirect_uris: ["https://ui-dev.orkesconductor.io", "http://localhost:5001"],
  javascript_origins: [
    "https://ui-dev.orkesconductor.io",
    "http://localhost:5001",
  ],
};

const oAuth2Client = new OAuth2Client(
  config.client_id,
  config.client_secret,
  config.redirect_uris[1],
);

@Injectable()
export class GoogleAuthService {
  async verifyCode(dto: CodeDto) {
    try {
      const { tokens } = await oAuth2Client.getToken(dto.code); // exchange code for tokens
      console.log(tokens);

      const userProfile = await oAuth2Client.verifyIdToken({
        idToken: tokens.id_token,
        audience: config.client_id,
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
