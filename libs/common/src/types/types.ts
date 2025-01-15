export const message = 'Hello from Libs';

export type CreateMappingDTO = {
  terms: string[];
  article: string;
};

export type AddKeywordToArticleDTO = {
  terms: string[];
};

export type CreateNewArticleDTO = {
  content: string;
};
