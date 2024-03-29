import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GoogleAuthModule } from "./google-auth/google-auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    GoogleAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? ".env"
        : `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
