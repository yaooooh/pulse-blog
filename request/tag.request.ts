import { Response } from "./type";

export type TagType = string


export function getTagList(): Promise<Response<TagType[]>> {
  return fetch('/api/tag/list').then(res => res.json()).then(({data}: {data: Response<TagType[]>}) => data);
}

// export function getTagById(id: string): Promise<Response<TagType>> {
//   return fetch(`/api/tag/${id}`).then(res => res.json()).then(({data}: {data: Response<TagType>}) => data);
// }
