import { Injectable } from "@nestjs/common";
import { TUserModel, User } from "./schemas/User.schema";
import { RegisterDto } from "./dto/register.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: TUserModel) {}

  create(data: RegisterDto){
    return this.userModel.createNew(data);
  }

  findById(id: string){
    return this.userModel.getById(id);
  }

  findByEmail(email:string){
    return this.userModel.getByEmail(email);
  }
}
