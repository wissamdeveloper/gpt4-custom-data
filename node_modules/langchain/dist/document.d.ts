export interface DocumentParams<Metadata extends Record<string, any> = Record<string, any>> {
    pageContent: string;
    metadata: Metadata;
}
/**
 * Interface for interacting with a document.
 */
export declare class Document<Metadata extends Record<string, any> = Record<string, any>> implements DocumentParams {
    pageContent: string;
    metadata: Metadata;
    constructor(fields?: Partial<DocumentParams<Metadata>>);
}
