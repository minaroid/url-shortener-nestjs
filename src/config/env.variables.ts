/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import Environment from './types/environment.type';
import { config } from 'dotenv';
import { Environments } from './env.validation';

const envPath = '.env';

config({ path: envPath, debug: true });

const configService = new ConfigService<Environments>();


const isLocal = configService.get('NODE_ENV', { infer: true }) === Environment.Local;
const isDevelopment = configService.get('NODE_ENV', { infer: true }) === Environment.Development;


export const VARIABLES = {
  PORT: configService.get('PORT', { infer: true }),
  ENV: configService.get('NODE_ENV', { infer: true }),
  IS_DEVELOPMENT: isDevelopment,
  IS_LOCAL: isLocal,
  S3_PUBLIC_BUCKET_NAME : configService.get('S3_PUBLIC_BUCKET_NAME', { infer: true }),
  DYNAMO_DB_ENDPOINT: isLocal ? configService.get('DYNAMO_DB_ENDPOINT', { infer: true }) : undefined,
  AWS_DEFAULT_SERVICE_OPTIONS: isLocal ? {
    region: configService.get('AWS_REGION', { infer: true }),
    credentials: {
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID', { infer: true }),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY', { infer: true }),
    },
  } : undefined
};
