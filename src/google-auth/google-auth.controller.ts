import { Body, Controller, Post } from "@nestjs/common";
import { GoogleAuthService } from "./google-auth.service";
import { CodeDto } from "./dto";

@Controller("google-auth")
export class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService) {}

  @Post("token")
  auth(@Body() dto: CodeDto) {
    return this.googleAuthService.verifyCode(dto);
  }
}
