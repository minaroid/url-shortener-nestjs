import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

import { ENV } from './types/environment.type';

export class Environments {
  @IsEnum(ENV)
  NODE_ENV: ENV;

  @IsNumber()
  PORT: number;

  @IsString()
  AWS_REGION: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  DYNAMO_DB_ENDPOINT: string;

  @IsString()
  S3_PUBLIC_BUCKET_NAME: string;

  @IsString()
  BASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Environments, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
