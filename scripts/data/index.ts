//import { linuxshellRepo } from "../../_data/linuxshell";
import { pythonprogrammingRepo } from "./pythonprogramming";
import { reactRepo } from "./react";
//import { tensorFlowRepo } from "../../_data/tensorflow";
import { cprogrammingRepo } from "./cprogramming";


export type RepoFile = {
	path: string;
	code: string;
}

export type Repo = {
	label: string;
	url: string;
	files: RepoFile[];
}

export const repoOptions: Repo[] = [
	cprogrammingRepo,
	pythonprogrammingRepo,
	reactRepo
]