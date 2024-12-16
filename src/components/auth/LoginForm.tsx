import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';

interface LoginFormProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export function LoginForm({ onForgotPassword, onRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.success) {
      newErrors.email = emailValidation.error.errors[0].message;
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Une erreur est survenue'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {errors.submit && (
        <div className="text-red-500 text-sm">{errors.submit}</div>
      )}

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-red-500 hover:text-red-400"
        >
          Mot de passe oublié ?
        </button>
        <button
          type="button"
          onClick={onRegister}
          className="text-red-500 hover:text-red-400"
        >
          Créer un compte
        </button>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
      >
        {isLoading ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  );
}