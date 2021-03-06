import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
    Logger.log(`running in ${filePath}`);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      APP_PORT: Joi.number().default(4771),
      RABBITMQ_URI: Joi.string().default('amqp://localhost:5672'),
      RABBITMQ_EXCHANGE: Joi.string().default('supply.exchange'),
      RABBITMQ_EXCHANGE_TYPE: Joi.string().default('direct'),
      RABBITMQ_ROUTES: Joi.string().default('shop.route|grocery.route'),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get Port(): number {
    return Number(this.envConfig.APP_PORT);
  }

  get QueueUri(): string {
    return String(this.envConfig.RABBITMQ_URI);
  }

  get QueueExchange(): string {
    return String(this.envConfig.RABBITMQ_EXCHANGE);
  }

  get QueueExchangeType(): string {
    return String(this.envConfig.RABBITMQ_EXCHANGE_TYPE);
  }

  get QueueRoutes(): string[] {
    return this.envConfig.RABBITMQ_ROUTES.split('|');
  }
}
