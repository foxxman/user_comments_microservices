import { Observable } from "rxjs";
import {
  ICommentResponse,
  ICreateCommentDTO,
  IGetCommentsDTO,
  IGetCommentsResponse,
  IUpdateCommentDTO,
} from "../types";

export interface ICommentsService {
  createComment(data: ICreateCommentDTO): Observable<ICommentResponse>;
  updateComment(data: IUpdateCommentDTO): Observable<ICommentResponse>;
  getComments(data: IGetCommentsDTO): Observable<IGetCommentsResponse>;
}
