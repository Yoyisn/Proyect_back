const  { z }  = require('zod');

const techRegisterSchema = z.object({
    name: z.string({ required_error: 'Username is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    number: z.string({ required_error: 'Number is required' }),
});

const techLoginSchema = z.object({
    email: z.string({ required_error: 'Email is required'}).email({ message: 'Invalid Email'}),
    password: z.string({ required_error: 'Password is required'}).min(6, { message: 'Password must be at least 6 characters'}),
});

const registerSchema = z.object({
    username: z.string({ required_error: 'Username is required'}),
    email: z.string({ required_error: 'Email is required'}).email({ message: 'Invalid Email'}),
    password: z.string({required_error: 'Password is required'}).min(6, { 
            message: 'Password must be at least 6 characters'}),
});

const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required'}).email({ message: 'Invalid Email'}),
    password: z.string({ required_error: 'Password is required'}).min(6, {
            message: 'Password must be at least 6 characters'}),
});

module.exports = { techRegisterSchema, techLoginSchema, registerSchema, loginSchema };