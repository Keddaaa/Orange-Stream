import { useState, useCallback } from 'react';

type ModalType = 'login' | 'register' | 'reset';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<ModalType>('login');

  const open = useCallback((modalType: ModalType = 'login') => {
    setType(modalType);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const switchType = useCallback((newType: ModalType) => {
    setType(newType);
  }, []);

  return {
    isOpen,
    type,
    open,
    close,
    switchType,
  };
}