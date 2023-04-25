import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';

import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PDFLoader } from "langchain/document_loaders";
import { PineconeStore } from 'langchain/vectorstores';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { pinecone } from '@/utils/pinecone-client';

/* Name of directory to retrieve your files from */
const filePath = 'docs/tst.pdf';
export const run = async () => {
  try {
    /*load raw docs from the all files in the directory */
    
    const loader = new PDFLoader(filePath);


    // const loader = new PDFLoader(filePath);
    const rawDocs = await loader.load();
    
    console.log("ffffffffffffffffffffffffff",loader.load());

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
