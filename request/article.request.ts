import { Response } from "./type";

export interface ArticleType {
  id: string;
  title: string;
  author: string;
  content: string;
  tags: string[];
  createTime: Date;
  updateTime: Date;
  size: number;
}


export function getArticleList(): Promise<Response<ArticleType[]>> {
  return fetch('/api/article/list').then(res => res.json()).then(({data}: {data: Response<ArticleType[]>}) => data);
}

export function getArticleById(id: string): Promise<Response<ArticleType>> {
  return fetch(`/api/article/${id}`).then(res => res.json()).then(({data}: {data: Response<ArticleType>}) => data);
}
