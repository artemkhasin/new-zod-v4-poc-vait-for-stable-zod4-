import { z } from 'zod';

export const myZodSampleSchema = z.object({
    id: z.string().min(2, 'ID is required').max(10, 'ID must be at most 10 characters long')
            .regex(/^[a-zA-Z0-9_-]+$/, 'ID can only contain letters, numbers, dashes and underscores')
            .meta({
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
    isActive: z.boolean().meta({
            label: 'Active Status',
            description: 'Indicates whether the user is currently active',
            inputType: 'FormSwitch',
        }).optional(),
    createdAt: z.string().refine(dateString => !isNaN(Date.parse(dateString)), {
            error: 'Created At must be a valid date',
        }).meta({
            label: 'Created At',
            description: 'Date when the user was created',
            inputType: 'FormDateInput',
        }).optional().nullable(),
    dataType: z.enum(['STRING', 'NUMBER', 'BOOLEAN'])
        .meta({
            label: 'Data Type',
            description: 'Data types associated with the user',
            inputType: 'FormDataTypeSelect',
            options: [
                { label: 'STRING', value: 'STRING' },
                { label: 'NUMBER', value: 'NUMBER' },
                { label: 'BOOLEAN', value: 'BOOLEAN' },
            ],
        }).optional().nullable(),
    settings: z.object({
        theme: z.enum(['light', 'dark']).meta({
            label: 'Theme',
            description: 'User interface theme preference',
            inputType: 'FormSelect',
            options: [
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
            ],
        }).optional().nullable(),
        notifications: z.boolean().meta({
            label: 'Notifications',
            description: 'Enable or disable notifications',
            inputType: 'FormCheckbox',
        }).optional().nullable(), 
    }).optional(),
}).meta({
    label: 'User',
    description: 'User information schema',
    defaultValues: {
        id: '',
        code: '',
        description: '',
        tags: [],
        createdAt: null,
        dataType: null,
        isActive: false, // Default value indicating the user is inactive
        settings: {
            theme: null,
            notifications: false, // Default value indicating notifications are disabled
        },
    },
});

export const myFormConfig = z.toJSONSchema(myZodSampleSchema)

export type MyFormType = z.infer<typeof myZodSampleSchema>;