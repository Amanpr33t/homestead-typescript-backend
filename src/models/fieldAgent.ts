import { Document, Schema, model } from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import 'express-async-errors';

export interface FieldAgent extends Document {
    email: string;
    password: string;
    authTokenExpiration?: Date | null;
    passwordVerificationToken?: string | null;
    passwordVerificationTokenExpirationDate?: Date | null;
}

export interface FieldAgentDocument extends FieldAgent {
    createJWT(): string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const FieldAgentSchema = new Schema<FieldAgentDocument>(
    {
        email: {
            type: String,
            required: [true, 'Please provide email'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
        },
        authTokenExpiration: {
            type: Date,
            default: null,
        },
        passwordVerificationToken: {
            type: String,
            default: null,
        },
        passwordVerificationTokenExpirationDate: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

FieldAgentSchema.pre<FieldAgentDocument>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

FieldAgentSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            fieldAgentId: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET || '',
        {
            expiresIn: process.env.JWT_LIFETIME || '30d',
        }
    );
};

FieldAgentSchema.methods.comparePassword = async function (candidatePassword:string) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

const FieldAgentModel = model<FieldAgentDocument>('FieldAgent', FieldAgentSchema);

export default FieldAgentModel;
