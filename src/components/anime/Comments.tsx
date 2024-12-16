import React, { useState } from 'react';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import type { Comment } from '../../types';

interface CommentsProps {
  episodeId: string;
}

export function Comments({ episodeId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: 'user-1', // Dans une vraie app, on utiliserait l'ID de l'utilisateur connecté
      episodeId,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Commentaires</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="w-full bg-gray-800 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Commenter
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <span>Utilisateur {comment.userId}</span>
              <span className="mx-2">•</span>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-200">{comment.content}</p>
            <div className="flex items-center mt-3 space-x-4">
              <button className="flex items-center text-sm text-gray-400 hover:text-white">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {comment.likes}
              </button>
              <button className="flex items-center text-sm text-gray-400 hover:text-white">
                <MessageCircle className="h-4 w-4 mr-1" />
                Répondre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}