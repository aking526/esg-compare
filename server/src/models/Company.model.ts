import mongoose, { Document, Schema } from "mongoose";

export interface ICompany {
	ticker: string;
	name: string;
	currency: string;
	exchange: string;
	industry: string;
	logo: string;
	weburl: string;
	esg_id: number;
	environment_grade: string;
	environment_level: string;
	social_grade: string;
	social_level: string;
	governance_grade: string;
	governance_level: string;
	environment_score: number;
	social_score: number;
	governance_score: number;
	total_score: number;
	last_processing_date: string;
}

export interface ICompanyModel extends ICompany, Document {}

const CompanySchema: Schema = new Schema(
	{
		ticker: { type: String, required: true },
		name: { type: String, required: true },
		currency: { type: String, required: true },
		exchange: { type: String, required: true },
		industry: { type: String, required: true },
		logo: { type: String, required: true },
		weburl: { type: String, required: true },
		esg_id: { type: Number, required: true },
		environment_grade: { type: String, required: true },
		environment_level: { type: String, required: true },
		social_grade: { type: String, required: true },
		social_level: { type: String, required: true },
		governance_grade: { type: String, required: true },
		governance_level: { type: String, required: true },
		environment_score: { type: Number, required: true },
		social_score: { type: Number, required: true },
		governance_score: { type: Number, required: true },
		total_score: { type: Number, required: true },
		last_processing_date: { type: String, required: true }
	},
	{
		versionKey: false
	}
);

export default mongoose.model<ICompanyModel>("Company", CompanySchema);