import * as mongoose from 'mongoose';
import { IGeneralUserSchema } from 'src/interfaces/generaluser.interface';
import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;



export const UserSchema = new mongoose.Schema<IGeneralUserSchema>({

  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email should be valid',
    ],
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  is_confirmed: {
    type: Boolean,
    default: false
  }
},
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue,
    },
  },
);

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret.password;
}

UserSchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

UserSchema.methods.compareEncryptedPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await this.getEncryptedPassword(this.password);
  next();
});