import { ConfigModule } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  // imports: [ConfigModule, forwardRef(() => DynamoDBManagerModule)],
  providers: [AuthService],
})
export class AuthModule {}
