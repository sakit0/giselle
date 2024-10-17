import type {
	GiselleNodeArtifactElement,
	GiselleNodeId,
} from "../giselle-node/types";

type ArtifactElement = GiselleNodeArtifactElement | Artifact;
export type ArtifactId = `art_${string}`;
export type Artifact = {
	id: ArtifactId;
	object: "artifact";
	title: string;
	content: string;
	generatorNode: GiselleNodeArtifactElement;
	elements: ArtifactElement[];
};
export type ArtifactReference = {
	id: ArtifactId;
	object: "artifact.reference";
};

export type GeneratedObject = {
	thinking: string;
	artifact: { title: string; content: string; completed: boolean };
	description: string;
};
export type PartialGeneratedObject = Partial<GeneratedObject>;