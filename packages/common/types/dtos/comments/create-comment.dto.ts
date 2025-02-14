import { DeleteAfterEnum } from "../../../constants";

export interface ICreateCommentDTO {
  userId: string;
  text: string;
  deleteAfter?: DeleteAfterEnum;
}
