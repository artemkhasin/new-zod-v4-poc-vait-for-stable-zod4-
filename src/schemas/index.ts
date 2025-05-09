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


// -----------------Profiles -----------------

export const profileSchema = z.object({
    username: z.string().min(3, 'Username is required and must be at least 3 characters long')
        .max(15, 'Username must be at most 15 characters long')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .meta({
            label: 'Username',
            description: 'Unique username for the profile',
            inputType: 'FormInput',
            step: 1,
        }),
    email: z.string().email('Email must be a valid email address').meta({
        label: 'Email',
        description: 'Email address associated with the profile',
        inputType: 'FormInput',
        step: 1,
    }),
    bio: z.string().max(250, 'Bio must be at most 250 characters long').meta({
        label: 'Bio',
        description: 'Short biography of the user',
        inputType: 'FormTextArea',
        step: 1,
    }).optional(),
    avatarUrl: z.string().url('Avatar URL must be a valid URL').meta({
        label: 'Avatar URL',
        description: 'URL of the profile avatar',
        inputType: 'FormInput',
        step: 1,
    }).optional().nullable(),
    birthDate: z.string().refine(dateString => !isNaN(Date.parse(dateString)), {
        error: 'Birth Date must be a valid date',
    }).meta({
        label: 'Birth Date',
        description: 'Date of birth of the user',
        inputType: 'FormDateInput',
        step: 1,
    }).optional().nullable(),
    preferences: z.object({
        language: z.enum(['en', 'es', 'fr', 'de']).meta({
            label: 'Language',
            description: 'Preferred language for the profile',
            inputType: 'FormSelect',
            step: 2,
            options: [
                { label: 'English', value: 'en' },
                { label: 'Spanish', value: 'es' },
                { label: 'French', value: 'fr' },
                { label: 'German', value: 'de' },
            ],
        }).optional().nullable(),
        darkMode: z.boolean().meta({
            label: 'Dark Mode',
            description: 'Enable or disable dark mode',
            inputType: 'FormSwitch',
            step: 2,
        }).optional().nullable(),
    }).optional(),
}).meta({
    label: 'Profile',
    description: 'Profile information schema',
    steps: ['General Info', 'Another Step'],
    defaultValues: {
        username: '',
        email: '',
        bio: '',
        avatarUrl: null,
        birthDate: null,
        preferences: {
            language: null,
            darkMode: false, // Default value indicating dark mode is disabled
        },
    },
});

export const profileFormConfig = z.toJSONSchema(profileSchema);

export type ProfileType = z.infer<typeof profileSchema>;