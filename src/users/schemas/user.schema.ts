import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Model, ObjectId } from "mongoose";
import { from, map, Observable, of } from "rxjs";
import { RegisterDto } from "../dto/register.dto";

export type TUserDocument = HydratedDocument<User> & TUserMethods;
export type TUserModel = Model<User> & TUserStatics;
type TUserStatics = {
  getById: (this: TUserModel, id: ObjectId) => Observable<TUserDocument>;
  getByEmail: (this: TUserModel, email: string) => Observable<TUserDocument>;
  createNew: (this: TUserModel, data: RegisterDto) => Observable<TUserDocument>;
};

type TUserMethods = {
  validateByPassword: (
    this: TUserDocument,
    password: string
  ) => Observable<boolean>;
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
    return from(this.findOne({ email })).pipe(
      map((user) => user as TUserDocument)
    );
  },
  getById(id) {
    return from(this.findById(id)).pipe(map((user) => user as TUserDocument));
  },
  createNew(data) {
    return from(this.create(data)).pipe(map((user) => user as TUserDocument));
  },
} satisfies TUserStatics;

UserSchema.methods = {
  validateByPassword(password) {
    return of(this.password === password);
  },
} satisfies TUserMethods;

export { UserSchema };
