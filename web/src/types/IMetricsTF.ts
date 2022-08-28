import ISA from "./ISA";

export interface IMetricsTF extends ISA {
	"total_score": boolean;
	"environment_score": boolean;
	"social_score": boolean;
	"governance_score": boolean;
}

export const FalseMTF: IMetricsTF = {
	"total_score": false,
	"environment_score": false,
	"social_score": false,
	"governance_score": false
};

