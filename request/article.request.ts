import { AxiosResponse } from "axios";
import Request from "./request";

export interface ArticleType {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  tags: string[];
  createTime: Date;
  updateTime: Date;
  size: number;
}

const request = new Request();

export function getArticleList(params?: Omit<Partial<ArticleType>, 'tags' | 'createTime' | 'updateTime' | 'size'>): Promise<AxiosResponse<ArticleType[]>> {
  return request.get<ArticleType[]>('/api/article/list', params);
}

export function getArticleById(id: string): Promise<AxiosResponse<ArticleType>> {
  return request.get<ArticleType>(`/api/article/${id}`);
}
