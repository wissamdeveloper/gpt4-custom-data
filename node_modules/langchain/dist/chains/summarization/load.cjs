"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSummarizationChain = void 0;
const llm_chain_js_1 = require("../llm_chain.cjs");
const combine_docs_chain_js_1 = require("../combine_docs_chain.cjs");
const stuff_prompts_js_1 = require("./stuff_prompts.cjs");
const loadSummarizationChain = (llm, params = {}) => {
    const { prompt = stuff_prompts_js_1.DEFAULT_PROMPT, combineMapPrompt = stuff_prompts_js_1.DEFAULT_PROMPT, combinePrompt = stuff_prompts_js_1.DEFAULT_PROMPT, type = "map_reduce", } = params;
    if (type === "stuff") {
        const llmChain = new llm_chain_js_1.LLMChain({ prompt, llm });
        const chain = new combine_docs_chain_js_1.StuffDocumentsChain({
            llmChain,
            documentVariableName: "text",
        });
        return chain;
    }
    if (type === "map_reduce") {
        const llmChain = new llm_chain_js_1.LLMChain({ prompt: combineMapPrompt, llm });
        const combineLLMChain = new llm_chain_js_1.LLMChain({ prompt: combinePrompt, llm });
        const combineDocumentChain = new combine_docs_chain_js_1.StuffDocumentsChain({
            llmChain: combineLLMChain,
            documentVariableName: "text",
        });
        const chain = new combine_docs_chain_js_1.MapReduceDocumentsChain({
            llmChain,
            combineDocumentChain,
            documentVariableName: "text",
        });
        return chain;
    }
    throw new Error(`Invalid _type: ${type}`);
};
exports.loadSummarizationChain = loadSummarizationChain;
