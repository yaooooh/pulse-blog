import { AxiosResponse } from "axios";
import Request from "./request";

export type TagType = string
const request = new Request();

export function getTagList(): Promise<AxiosResponse<TagType[]>> {
  return request.get<TagType[]>('/api/tag/list');
}

// export function getTagById(id: string): Promise<Response<TagType>> {
//   return fetch(`/api/tag/${id}`).then(res => res.json()).then(({data}: {data: Response<TagType>}) => data);
// }
