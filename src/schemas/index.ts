import { z } from 'zod';

export const myZodSampleSchema = z.object({
    id: z.string().min(2, 'ID is required').max(10, 'ID must be at most 10 characters long').meta({
            label: 'ID',
            description: 'Unique identifier for the user',
            inputType: 'FormIdInput',
        }),
    code: z.string().min(5, 'Code is required').max(10, 'Code must be at most 10 characters long').meta({
            label: 'Code',
            description: 'Unique code for the user',
            inputType: 'FormInput',
        }),
    description: z.string().min(1, 'Description is required').max(100, 'Description must be at most 100 characters long').meta({
            label: 'Description',
            description: 'Description of the user',
            inputType: 'FormTextArea',
        }),
    tags: z.array(z.string()).meta({
            label: 'Tags',
            description: 'Tags associated with the user',
            inputType: 'FormTagsInput',
        }).optional(),
    createdAt: z.string().refine(dateString => !isNaN(Date.parse(dateString)), {
            message: 'Created At must be a valid date',
        }).meta({
            label: 'Created At',
            description: 'Date when the user was created',
            inputType: 'FormDateInput',
        }).optional(),
}).meta({
    label: 'User',
    description: 'User information schema',
});

export const myFormConfig = z.toJSONSchema(myZodSampleSchema)

export type MyFormType = z.infer<typeof myZodSampleSchema>;