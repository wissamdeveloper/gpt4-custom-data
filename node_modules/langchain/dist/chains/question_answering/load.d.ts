import { BasePromptTemplate } from "../../prompts/base.js";
import { StuffDocumentsChain, MapReduceDocumentsChain, RefineDocumentsChain } from "../combine_docs_chain.js";
import { BaseLanguageModel } from "../../base_language/index.js";
interface qaChainParams {
    prompt?: BasePromptTemplate;
    combineMapPrompt?: BasePromptTemplate;
    combinePrompt?: BasePromptTemplate;
    questionPrompt?: BasePromptTemplate;
    refinePrompt?: BasePromptTemplate;
    type?: string;
}
export declare const loadQAChain: (llm: BaseLanguageModel, params?: qaChainParams) => StuffDocumentsChain | MapReduceDocumentsChain | RefineDocumentsChain;
interface StuffQAChainParams {
    prompt?: BasePromptTemplate;
}
export declare const loadQAStuffChain: (llm: BaseLanguageModel, params?: StuffQAChainParams) => StuffDocumentsChain;
interface MapReduceQAChainParams {
    combineMapPrompt?: BasePromptTemplate;
    combinePrompt?: BasePromptTemplate;
}
export declare const loadQAMapReduceChain: (llm: BaseLanguageModel, params?: MapReduceQAChainParams) => MapReduceDocumentsChain;
interface RefineQAChainParams {
    questionPrompt?: BasePromptTemplate;
    refinePrompt?: BasePromptTemplate;
}
export declare const loadQARefineChain: (llm: BaseLanguageModel, params?: RefineQAChainParams) => RefineDocumentsChain;
export {};
