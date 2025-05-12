import { z } from "zod";

export const tenantNamesSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Phone must be at least 10 characters"),
});

export const tenantNamesFormSchema = z.object({
  description: z.string().optional(),
  tenants: z.array(tenantNamesSchema).min(1, "At least one friend is required"),
});

export type TTenantNamesFormValues = z.infer<typeof tenantNamesFormSchema>;
