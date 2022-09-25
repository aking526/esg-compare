import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ICompany } from "../models/Company.model";
import Logging from "../utils/Logging";

export const ValidateSchema = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			Logging.log(req.body);
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			Logging.error(error);
			return res.status(422).json({ error });
		}
	};
};

export const schemas = {
	company: {
		create: Joi.object<ICompany>({
			ticker: Joi.string().required(),
			name: Joi.string().required(),
			currency: Joi.string().required(),
			exchange: Joi.string().required(),
			industry: Joi.string().required(),
			logo: Joi.string().required(),
			weburl: Joi.string().required(),
			esg_id: Joi.number().required(),
			environment_grade: Joi.string().required(),
			environment_level: Joi.string().required(),
			social_grade: Joi.string().required(),
			social_level: Joi.string().required(),
			governance_grade: Joi.string().required(),
			governance_level: Joi.string().required(),
			environment_score: Joi.number().required(),
			social_score: Joi.number().required(),
			governance_score: Joi.number().required(),
			total_score: Joi.number().required()
		}),
		update: Joi.object<ICompany>({
			ticker: Joi.string().required(),
			name: Joi.string().required(),
			currency: Joi.string().required(),
			exchange: Joi.string().required(),
			industry: Joi.string().required(),
			logo: Joi.string().required(),
			weburl: Joi.string().required(),
			esg_id: Joi.number().required(),
			environment_grade: Joi.string().required(),
			environment_level: Joi.string().required(),
			social_grade: Joi.string().required(),
			social_level: Joi.string().required(),
			governance_grade: Joi.string().required(),
			governance_level: Joi.string().required(),
			environment_score: Joi.number().required(),
			social_score: Joi.number().required(),
			governance_score: Joi.number().required(),
			total_score: Joi.number().required()
		})
	}
}
