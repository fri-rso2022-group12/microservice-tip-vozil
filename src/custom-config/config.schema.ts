import * as Joi from 'joi';

export const ConfigSchema: Joi.ObjectSchema = Joi.object().keys({
	DOCS: Joi.boolean().default(true),
	DOC_PATH: Joi.string().default('openapi'),
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
	PORT: Joi.number().default(process.env.PORT || 3000),

	CONFIG: Joi.string(),
	IGNORE_CONFIG: Joi.boolean(),

	/**
	 * TypeORM
	 * @see https://typeorm.io/#/using-ormconfig/using-environment-variables
	 * @see https://typeorm.io/#/connection-options/
	 */
	TYPEORM_CONNECTION: Joi.string().default('mariadb'),
	TYPEORM_HOST: Joi.string().default('localhost'),
	TYPEORM_USERNAME: Joi.string().default('root'),
	TYPEORM_PASSWORD: Joi.string(),
	TYPEORM_DATABASE: Joi.string().default('rso-ms-tip-vozil'),
	TYPEORM_PORT: Joi.number().default(3306),
	TYPEORM_SYNCHRONIZE: Joi.boolean().default(true),
	TYPEORM_LOGGING: Joi.boolean().default(false),
});
