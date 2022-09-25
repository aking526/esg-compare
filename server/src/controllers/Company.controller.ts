import { Request, Response, NextFunction } from "express";
import mongoose, { ObjectId } from "mongoose";
import Company, { ICompanyModel } from "../models/Company.model";
import { MTTSC } from "../utils/convert";
import ISA from "../types/ISA";
import { config } from "../config/config";

const createCompany = (req: Request, res: Response, next: NextFunction) => {
	const { name, ticker, currency, exchange, industry, logo, weburl, esg_id, environment_grade, environment_level, environment_score, social_grade, social_level, social_score, governance_grade, governance_level, governance_score, total_score } = req.body;
	const auth = req.params.auth;

	if (auth !== config.server.auth) {
		return res.status(403).json({ message: "No Authorization" });
	}

	const company = new Company({
		_id: new mongoose.Types.ObjectId(),
		ticker,
		name,
		currency,
		exchange,
		industry,
		logo,
		weburl,
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
			.then((company) => (company ? res.status(200).json(company) : res.status(404).json({ message: "Not Found" })))
			.catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
	return Company.find()
			.then(companies => res.status(200).json({ companies }))
			.catch((error) => res.status(500).json({ error }));
};

const updateCompany = (req: Request, res: Response, next: NextFunction) => {
	const auth = req.params.ticker;
	const companyTicker = req.params.ticker;

	if (auth !== config.server.auth) {
		return res.status(403).json({ message: "No Authorization" });
	}

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
	const auth = req.params.auth;
	const companyTicker = req.params.ticker;

	if (auth !== config.server.auth) {
		return res.status(403).json({ message: "No Authorization" });
	}

	return Company.findOneAndDelete({ ticker: companyTicker })
			.then((company) => (company ? res.status(201).json({ message: "deleted"}) : res.status(404).json({ message: "not found" })))
			.catch((error) => res.status(500).json({ error }));
};

const readCompanyNames = (req: Request, res: Response, next: NextFunction) => {
	return Company.find().select({ "name": 1, "ticker": 1, "_id": 0 })
			.then((data: (ICompanyModel & {_id: mongoose.Types.ObjectId})[]) => {
				let formatted: ISA = {};
				for (let i = 0; i < data.length; i++) {
					formatted[data[i]["ticker"]] = data[i]["name"];
				}
				res.status(200).json(formatted);
			})
			.catch((error) => res.status(500).json({ error }));
};

const readIndustries = (req: Request, res: Response, next: NextFunction) => {
	return Company.find().select({ "industry": 1, "_id": 0 })
			.then((data: (ICompanyModel & {_id: ObjectId })[]) => {
				let formatted: string[] = [];
				for (let i = 0; i < data.length; i++) {
					formatted.push(data[i].industry);
				}
				res.status(200).json(formatted);
			})
			.catch((error) => res.status(500).json({ error }));
};

const readSort = (req: Request, res: Response, next: NextFunction) => {
	const metric = req.params.metric;
	const industry = req.query.industry;

	let filters: {
		[index: string]: string | number | object;
	} = {};

	if (typeof industry === "string") {
		if (industry.includes(",")) {
			filters["industry"] = { $in: industry.split(",") };
		}	else {
			filters["industry"] = industry;
		}
	}

	return Company.find(filters).sort(MTTSC[metric])
			.then((companies) => res.status(200).json(companies))
			.catch((error) => res.status(500).json({ error }));
};

export default { createCompany, readCompany, readAll, updateCompany, deleteCompany, readCompanyNames, readIndustries, readSort };