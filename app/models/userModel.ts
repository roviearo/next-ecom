import { genSalt, hash } from 'bcrypt';
import { Document, Model, Schema, model, models } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
  avatar: { url: string; id: string };
  verified: boolean;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    avatar: { type: Object, url: String, id: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

const UserModel = models.User || model('User', userSchema);

export default UserModel as Model<UserDocument>;
