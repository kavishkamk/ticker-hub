import { Schema, model, Model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { Password } from "../services/password";

// an interface that describe properties
// that are required to create new user
interface IUser {
    email: string;
    password: string;
}

// an interface that describe properties
// that are required to create user model
interface UserModel extends Model<UserDoc> {
    build(attrs: IUser): UserDoc;
}

// an interface that describe properties
// that a user document has
interface UserDoc extends Document {
    email: string;
    password: string;
}

const userSchema = new Schema<UserDoc, UserModel>({
    email: {
        type: String,
        unique: true,
        required: [true, 'email required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    }
}, {
    timestamps: true
});

// to unique fields
userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

// to create object from the model
userSchema.statics.build = (attrs: IUser): IUser => {
    return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };