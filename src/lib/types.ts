// Common types for the application

export type PatientType = 'IPD' | 'OPD' | 'ACF';
export type Condition = 'RECOVERED' | 'DIED' | 'UNDER_TREATMENT';
export type Gender = 'MALE' | 'FEMALE';

export interface MasterDataCategory {
	PREFIX: string[];
	OCCUPATION: string[];
	NATIONALITY: string[];
	MARITAL_STATUS: string[];
}

