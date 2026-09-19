// src/services/tmdb.js

const API_BASE = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

const basicFetch = async (endpoint) => {
  try {
    // URL apenas com o endpoint e o parâmetro language=pt-BR (sem api_key na URL)
    const url = `${API_BASE}${endpoint}?language=pt-BR`;
    
    // Configuramos o cabeçalho com a autorização Bearer
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erro ao comunicar com a API do TMDB:", error);
    throw error;
  }
};

export const getSeriesPopulares = async () => {
  return await basicFetch('/trending/tv/week');
};