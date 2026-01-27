export type AddLink = {
	linkOriginal: string;
	linkShortened: string;
};

export type GetLink = {
	id: string;
	linkOriginal: string;
	linkShortened: string;
	numberOfAccesses: number;
};

export type GetListLinks = {
	links: GetLink[];
	total: number;
};