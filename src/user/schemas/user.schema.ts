import { Schema } from 'mongoose';
import { UserRole } from 'src/common/enums/role.enum';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: UserRole,
    default: UserRole.user,
  },
  active: { type: Boolean, default: true },
});
export default UserSchema;
