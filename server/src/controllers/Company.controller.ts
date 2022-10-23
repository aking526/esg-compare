import { Request, Response, NextFunction } from "express";
import mongoose, { ObjectId } from "mongoose";
import Company, { ICompanyModel } from "../models/Company.model";
import { MTTSC } from "../utils/convert";
import ISA from "../types/ISA";
import { config } from "../config/config";

const createCompany = (req: Request, res: Response, next: NextFunction) => {
	const { name, ticker, cik, currency, exchange, industry, logo, weburl, esg_id, environment_grade, environment_level, environment_score, social_grade, social_level, social_score, governance_grade, governance_level, governance_score, total_grade, total_level, total_score, last_processing_date } = req.body;
	const auth = req.params.auth;

	if (auth !== config.server.auth) {
		return res.status(403).json({ message: "No Authorization" });
	}

	const company = new Company({
		_id: new mongoose.Types.ObjectId(),
		ticker,
		name,
		cik,
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
		total_grade,
		total_level,
		total_score,
		last_processing_date
	});

	return company.save()
			.then((company) => res.status(201).json({ company }))
			.catch((error) => res.status(500).json({ error }));
};

const readCompany = async (req: Request, res: Response, next: NextFunction) => {
	const companyTicker = req.params.ticker;
	const key = req.params.key;

	if (key !== config.server.key) {
		return res.status(403).json({ message: "Invalid API Key"});
	}

	return Company.find({ ticker: companyTicker })
			.then((company) => (company ? res.status(200).json(company) : res.status(404).json({ message: "Not Found" })))
			.catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
	const key = req.params.key;

	if (key !== config.server.key) {
		return res.status(403).json({ message: "Invalid API Key"});
	}

	return Company.find()
			.then(companies => res.status(200).json({ companies }))
			.catch((error) => res.status(500).json({ error }));
};

const updateCompany = (req: Request, res: Response, next: NextFunction) => {
	const companyTicker = req.params.ticker;
	const auth = req.params.auth;

	if (auth !== config.server.auth) {
		return res.status(403).json({ message: `No Authorization. Your auth: ${auth}. Correct auth: ${config.server.auth}` });
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
			.then((company) => (company ? res.status(201).json({ message: "deleted" }) : res.status(404).json({ message: "not found" })))
			.catch((error) => res.status(500).json({ error }));
};

const deleteById = (req: Request, res: Response, next: NextFunction) => {
	const auth = req.params.auth;
	const id = req.params.id;

	if (auth !== config.server.auth) {
		return res.status(403).json({ message: "No Authorization "});
	}

	return Company.findByIdAndDelete(id)
			.then((company) => (company ? res.status(201).json({ message: "deleted" }) : res.status(404).json({ message: "not found" })))
			.catch((error) => res.status(500).json({ error }));
};

const readCompanyNames = (req: Request, res: Response, next: NextFunction) => {
	const key = req.params.key;


	if (key !== config.server.key) {
		return res.status(403).json({ message: "Invalid API Key" });
	}

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
	const key = req.params.key;

	if (key !== config.server.key) {
		return res.status(403).json({ message: `Invalid API Key ${key}` });
	}

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
	const key = req.params.key;

	if (key !== config.server.key) {
		return res.status(403).json({ message: "Invalid API Key"});
	}

	const metric = req.params.metric;
	const industry = req.query.industry;
	const exchange = req.query.exchange;

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

	if (typeof exchange === "string") {
		filters["exchange"] = exchange;
	}

	return Company.find(filters).sort(MTTSC[metric])
			.then((companies) => res.status(200).json(companies))
			.catch((error) => res.status(500).json({ error }));
};

const getScores = (req: Request, res: Response, next: NextFunction) => {
	const key = req.params.key;

	if (key !== config.server.key) {
		return res.status(403).json({ message: "Invalid API Key"});
	}

	const industry = req.query.industry;

	let filters: {
		[index: string]: string | number | object;
	} = {};

	if (typeof industry === "string") {
		if (industry.includes(",") && !industry.includes("Hotels")) {
			filters["industry"] = { $in: industry.split(",") };
		}	else {
			filters["industry"] = industry;
		}
	}

	return Company.find(filters).select({ "environment_score": 1, "social_score": 1, "governance_score": 1, "total_score": 1, "_id": 0 })
		.then((scores) => res.status(200).json(scores))
		.catch((error) => res.status(500).json({ error }));
};

const getGrades = (req: Request, res: Response, next: NextFunction) => {
	const key = req.params.key;

	if (key !== config.server.key) {
		return res.status(403).json({ message: "Invalid API Key"});
	}

	const industry = req.query.industry;

	let filters: {
		[index: string]: string | number | object;
	} = {};

	if (typeof industry === "string") {
		if (industry.includes(",") && !industry.includes("Hotels")) {
			filters["industry"] = { $in: industry.split(",") };
		}	else {
			filters["industry"] = industry;
		}
	}

	return Company.find(filters).select({ "environment_grade": 1, "social_grade": 1, "governance_grade": 1, "total_grade": 1, "_id": 0 })
		.then((grades) => res.status(200).json(grades))
		.catch((error) => res.status(500).json({ error }));
};

const getLevels = (req: Request, res: Response, next: NextFunction) => {
	const key = req.params.key;

	if (key !== config.server.key) {
		return res.status(403).json({ message: "Invalid API Key"});
	}

	const industry = req.query.industry;

	let filters: {
		[index: string]: string | number | object;
	} = {};

	if (typeof industry === "string") {
		if (industry.includes(",") && !industry.includes("Hotels")) {
			filters["industry"] = {$in: industry.split(",")};
		} else {
			filters["industry"] = industry;
		}
	}

	return Company.find(filters).select({ "environment_level": 1, "social_level": 1, "governance_level": 1, "total_level": 1, "_id": 0 })
		.then((levels) => res.status(200).json(levels))
		.catch((error) => res.status(500).json({ error }));
};

const tempFixer = (req: Request, res: Response, next: NextFunction) => {
	const auth = req.params.auth;

	if (auth !== config.server.auth) {
		return res.status(403).json({ message: "No Authorization "});
	}

	return Company.find({ industry: "Metals & Mining" })
		.then((companies) => res.status(200).json(companies))
		.catch((error) => res.status(500).json({ error }));
};

export default { createCompany, readCompany, readAll, updateCompany, deleteCompany, deleteById, readCompanyNames, readIndustries, readSort, getScores, getGrades, getLevels, tempFixer };