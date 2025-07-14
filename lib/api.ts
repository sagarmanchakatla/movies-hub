import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const API_TOKEN = `Bearer ${ACCESS_TOKEN}`;

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  // [key: string]: any;
}

interface ApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Credits {
  id: number;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
}

// Create Axios instance with default headers
const tmdbApi = axios.create({
  baseURL: API_URL,
  headers: {
    accept: "application/json",
    Authorization: API_TOKEN,
  },
});

export const fetchPopularMovies = async (page = 1): Promise<ApiResponse> => {
  try {
    const response = await tmdbApi.get("/movie/popular", {
      params: {
        language: "en-US",
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const searchMovies = async (
  query: string,
  page = 1
): Promise<ApiResponse> => {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const searchMulti = async (
  query: string,
  page = 1
): Promise<ApiResponse> => {
  try {
    const response = await tmdbApi.get("/search/multi", {
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page: page,
      },
    });
    return response.data; // This was missing!
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error; // This was missing!
  }
};

export const fetchMovieDetails = async (
  id: number | string
): Promise<Movie> => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCredits = async (id: string): Promise<Credits> => {
  try {
    const response = await tmdbApi.get(`/movie/${id}/credits`, {
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

// Combined function to get both details and credits
export const fetchMovieWithCredits = async (id: string) => {
  try {
    const [details, credits] = await Promise.all([
      fetchMovieDetails(id),
      fetchMovieCredits(id),
    ]);
    return { ...details, credits };
  } catch (error) {
    console.error("Error fetching movie with credits:", error);
    throw error;
  }
};

// Extended function with videos
export const fetchMovieWithCreditsAndVideos = async (id: string) => {
  try {
    const response = await tmdbApi.get(`/movie/${id}`, {
      params: {
        append_to_response: "credits,videos",
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie with credits and videos:", error);
    throw error;
  }
};
