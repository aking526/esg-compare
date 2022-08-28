import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Company from "../models/Company.model";
import { MTTSC } from "../utils/ConvertText";

const createCompany = (req: Request, res: Response, next: NextFunction) => {
	const { name, ticker, currency, exchange, industry, logo, weburl, market_cap, esg_id, environment_grade, environment_level, environment_score, social_grade, social_level, social_score, governance_grade, governance_level, governance_score, total_score } = req.body;

	const company = new Company({
		_id: new mongoose.Types.ObjectId(),
		ticker,
		name,
		currency,
		exchange,
		industry,
		logo,
		weburl,
		market_cap,
		esg_id,
		environment_grade,
		environment_level,
		environment_score,
		social_grade,
		social_level,
		social_score,
		governance_grade,
		governance_level,
		governance_score,
		total_score
	});

	return company.save()
		.then((company) => res.status(201).json({ company }))
		.catch((error) => res.status(500).json({ error }));
};

const readCompany = async (req: Request, res: Response, next: NextFunction) => {
	const companyTicker = req.params.ticker;

	return Company.findOne({ ticker: companyTicker })
		.then((company) => (company ? res.status(200).json(company) : res.status(404).json({ message: "not found " })))
		.catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
	return Company.find()
		.then(companies => res.status(200).json({ companies }))
		.catch((error) => res.status(500).json({ error }));
};

const updateCompany = (req: Request, res: Response, next: NextFunction) => {
	const companyTicker = req.params.ticker;

	return Company.findOne({ ticker: companyTicker })
		.then((company) => {
			if (company) {
				company.set(req.body);

				return company.save()
					.then((company) => res.status(201).json({ company }))
					.catch((error) => res.status(500).json({ error }));
			} else {
				res.status(404).json({ message: "not found" });
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

const deleteCompany = (req: Request, res: Response, next: NextFunction) => {
	const companyTicker = req.params.ticker;

	return Company.findOneAndDelete({ ticker: companyTicker })
		.then((company) => (company ? res.status(201).json({ message: "deleted"}) : res.status(404).json({ message: "not found" })))
		.catch((error) => res.status(500).json({ error }));
};

const readSort = (req: Request, res: Response, next: NextFunction) => {
	const metric = req.params.metric;

	return Company.find().sort(MTTSC[metric])
		.then((companies) => res.status(200).json(companies))
		.catch((error) => res.status(500).json({ error }));
};

export default { createCompany, readCompany, readAll, updateCompany, deleteCompany, readSort };