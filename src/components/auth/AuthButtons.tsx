import React from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { Button } from '../common/Button/Button';
import { useModal } from '../../hooks/common/useModal';
import { AuthModal } from './AuthModal';

export function AuthButtons() {
  const { isOpen, type, open, close, switchType } = useModal();

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={LogIn}
          onClick={() => open('login')}
        >
          Connexion
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={UserPlus}
          onClick={() => open('register')}
        >
          S'inscrire
        </Button>
      </div>

      <AuthModal
        isOpen={isOpen}
        type={type}
        onClose={close}
        onSwitchType={switchType}
      />
    </>
  );
}