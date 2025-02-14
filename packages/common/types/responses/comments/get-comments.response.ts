import { ICommentResponse } from "./comment.response";

export interface IGetCommentsResponse {
  comments: ICommentResponse[];
  total: number;
}
