import { Observable } from "rxjs";
import { ICommentResponse, ICreateCommentDTO } from "../types";

export interface ICommentsService {
  createComment(data: ICreateCommentDTO): Observable<ICommentResponse>;
}
