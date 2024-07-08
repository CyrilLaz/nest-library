import { Injectable } from "@nestjs/common";
import { TUserDocument, TUserModel, User } from "./schemas/User.schema";
import { RegisterDto } from "./dto/register.dto";
import {  Observable } from "rxjs";
import { ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: TUserModel) {}

  create(data: RegisterDto): Observable<TUserDocument> {
    return this.userModel.createNew(data);
  }

  findById(id: ObjectId): Observable<TUserDocument> {
    return this.userModel.getById(id);
  }

  findByEmail(email:string):Observable<TUserDocument>{
    return this.userModel.getByEmail(email);
  }
}
