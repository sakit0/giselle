import { WorkspaceId } from "@giselle-sdk/data-type";
import { NextGiselleEngine } from "@giselle-sdk/giselle-engine/next-internal";
import type {
	GiselleIntegrationConfig,
	LanguageModelProvider,
} from "giselle-sdk";

import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import supabaseStorageDriver from "./supabase-storage-driver";

const isVercelEnvironment = process.env.VERCEL === "1";

const storage = createStorage({
	driver: isVercelEnvironment
		? supabaseStorageDriver({
				supabaseUrl: process.env.SUPABASE_URL ?? "",
				supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY ?? "",
				bucket: "app",
			})
		: fsDriver({
				base: "./.storage",
			}),
});

const llmProviders: LanguageModelProvider[] = [];
if (process.env.OPENAI_API_KEY) {
	llmProviders.push("openai");
}
if (process.env.ANTHROPIC_API_KEY) {
	llmProviders.push("anthropic");
}
if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
	llmProviders.push("google");
}

if (llmProviders.length === 0) {
	throw new Error("No LLM providers configured");
}

let integrationConfigs: GiselleIntegrationConfig = {};
// if (
// 	process.env.GITHUB_APP_ID &&
// 	process.env.GITHUB_APP_PRIVATE_KEY &&
// 	process.env.GITHUB_APP_CLIENT_ID &&
// 	process.env.GITHUB_APP_CLIENT_SECRET
// ) {
// 	integrationConfigs.push({
// 		provider: "github",
// 		auth: {
// 			strategy: "github-installation",
// 			appId: process.env.GITHUB_APP_ID,
// 			privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
// 		},
// 	});
// }
if (process.env.GITHUB_TOKEN) {
	integrationConfigs = {
		github: {
			auth: {
				strategy: "personal-access-token",
				personalAccessToken: process.env.GITHUB_TOKEN,
			},
		},
	};
}

if (process.env.PERPLEXITY_API_KEY) {
	llmProviders.push("perplexity");
}

if (process.env.FAL_API_KEY) {
	llmProviders.push("fal");
}

let sampleAppWorkspaceId: WorkspaceId | undefined = undefined;
if (process.env.SAMPLE_APP_WORKSPACE_ID) {
	const parseResult = WorkspaceId.safeParse(
		process.env.SAMPLE_APP_WORKSPACE_ID,
	);
	if (parseResult.success) {
		sampleAppWorkspaceId = parseResult.data;
	}
}

export const giselleEngine = NextGiselleEngine({
	basePath: "/api/giselle",
	storage,
	llmProviders,
	integrationConfigs,
	sampleAppWorkspaceId,
});
