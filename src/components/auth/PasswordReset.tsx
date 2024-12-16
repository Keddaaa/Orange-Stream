import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader } from 'lucide-react';

export function PasswordReset() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simuler l'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSent(true);
    setIsLoading(false);
  };

  if (isSent) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Email envoyé</h2>
        <p className="text-gray-400 mb-6">
          Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.
        </p>
        <button
          onClick={() => setIsSent(false)}
          className="text-red-500 hover:text-red-400 flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Mot de passe oublié</h2>
      <p className="text-gray-400 mb-6 text-center">
        Entrez votre adresse email pour recevoir un lien de réinitialisation.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="reset-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-red-700 transition disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader className="h-5 w-5 animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <span>Envoyer le lien</span>
          )}
        </button>
      </form>
    </div>
  );
}