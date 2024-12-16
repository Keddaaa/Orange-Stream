import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Adresse email invalide")
  .min(1, "L'email est requis");

export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre");

export const usernameSchema = z
  .string()
  .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
  .max(20, "Le nom d'utilisateur ne doit pas dépasser 20 caractères")
  .regex(/^[a-zA-Z0-9_-]+$/, "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores");

export function validateEmail(email: string) {
  return emailSchema.safeParse(email);
}

export function validatePassword(password: string) {
  return passwordSchema.safeParse(password);
}

export function validateUsername(username: string) {
  return usernameSchema.safeParse(username);
}