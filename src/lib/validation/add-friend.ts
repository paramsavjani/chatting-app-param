import {z} from 'zod';

export const AddFriendSchema = z.object({
  email: z.string().email(),
});

