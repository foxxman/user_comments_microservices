import { Observable } from "rxjs";
import {
  ICommentResponse,
  ICreateCommentDTO,
  IDeleteCommentDTO,
  IGetCommentsDTO,
  IGetCommentsResponse,
  IUpdateCommentDTO,
} from "../types";

export interface ICommentsService {
  createComment(data: ICreateCommentDTO): Observable<ICommentResponse>;
  updateComment(data: IUpdateCommentDTO): Observable<ICommentResponse>;
  getComments(data: IGetCommentsDTO): Observable<IGetCommentsResponse>;
  deleteComment(data: IDeleteCommentDTO): Observable<ICommentResponse>;
}
