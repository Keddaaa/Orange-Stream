import React, { useState } from 'react';
import { Mail, Lock, User, Loader } from 'lucide-react';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validation';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.success) {
      newErrors.username = usernameValidation.error.errors[0].message;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.success) {
      newErrors.email = emailValidation.error.errors[0].message;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.success) {
      newErrors.password = passwordValidation.error.errors[0].message;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(formData);
      onSuccess?.();
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Une erreur est survenue'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        icon={User}
        placeholder="Nom d'utilisateur"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        error={errors.username}
      />

      <Input
        type="email"
        icon={Mail}
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />

      <Input
        type="password"
        icon={Lock}
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
      />

      <Input
        type="password"
        icon={Lock}
        placeholder="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
      />

      {errors.submit && (
        <div className="text-red-500 text-sm">{errors.submit}</div>
      )}

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
      >
        {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
      </Button>
    </form>
  );
}