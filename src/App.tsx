import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Container } from './components/layout/Container';
import { Hero } from './components/anime/Hero';
import { AnimeList } from './components/anime/AnimeList';
import { useAnimeData } from './hooks/useAnimeData';
import { LoadingState } from './components/anime/LoadingState';
import { ErrorState } from './components/anime/ErrorState';

function App() {
  const { animes, isLoading, error } = useAnimeData();

  return (
    <MainLayout>
      <Hero />
      <Container>
        <main className="py-8">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            <AnimeList 
              title="Tendances" 
              animes={animes} 
            />
          )}
        </main>
      </Container>
    </MainLayout>
  );
}

export default App;