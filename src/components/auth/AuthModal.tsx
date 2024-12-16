import React from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { PasswordReset } from './PasswordReset';
import { Modal } from '../common/Modal/Modal';

interface AuthModalProps {
  isOpen: boolean;
  type: 'login' | 'register' | 'reset';
  onClose: () => void;
  onSwitchType: (type: 'login' | 'register' | 'reset') => void;
}

export function AuthModal({ isOpen, type, onClose, onSwitchType }: AuthModalProps) {
  const titles = {
    login: 'Connexion',
    register: 'Inscription',
    reset: 'Réinitialisation du mot de passe',
  };

  const renderContent = () => {
    switch (type) {
      case 'login':
        return (
          <LoginForm 
            onForgotPassword={() => onSwitchType('reset')}
            onRegister={() => onSwitchType('register')}
          />
        );
      case 'register':
        return (
          <RegisterForm 
            onSuccess={onClose}
            onLogin={() => onSwitchType('login')}
          />
        );
      case 'reset':
        return (
          <PasswordReset 
            onBack={() => onSwitchType('login')}
          />
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[type]}
      className="max-w-md"
    >
      {renderContent()}
    </Modal>
  );
}