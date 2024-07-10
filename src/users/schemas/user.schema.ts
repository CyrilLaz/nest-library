import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { RegisterDto } from "../dto/register.dto";

export type TUserDocument = HydratedDocument<User> & TUserMethods;
export type TUserModel = Model<User> & TUserStatics;
type TUserStatics = {
  getById: (this: TUserModel, id: string) => Promise<TUserDocument | null>;
  getByEmail: (
    this: TUserModel,
    email: string
  ) => Promise<TUserDocument | null>;
  createNew: (this: TUserModel, data: RegisterDto) => Promise<TUserDocument>;
};

type TUserMethods = {
  validateByPassword: (this: TUserDocument, password: string) => boolean;
};

@Schema({ versionKey: false })
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.statics = {
  getByEmail(email) {
    return this.findOne({ email });
  },
  getById(id) {
    return this.findById(id);
  },
  async createNew(data) {
    const user = new this(data);
    return (await user.save()) as TUserDocument;
  },
} satisfies TUserStatics;

UserSchema.methods = {
  validateByPassword(password) {
    return this.password === password;
  },
} satisfies TUserMethods;

export { UserSchema };
