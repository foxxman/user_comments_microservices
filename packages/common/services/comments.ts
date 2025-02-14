import { Observable } from "rxjs";
import {
  ICommentResponse,
  ICreateCommentDTO,
  IUpdateCommentDTO,
} from "../types";

export interface ICommentsService {
  createComment(data: ICreateCommentDTO): Observable<ICommentResponse>;
  updateComment(data: IUpdateCommentDTO): Observable<ICommentResponse>;
}
