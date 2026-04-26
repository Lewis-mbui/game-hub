import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_GENRES } from "@/data/constants";
import { type FetchResponse } from "./useData";
import apiClient from "@/services/api-client";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: CACHE_KEY_GENRES,
    queryFn: () =>
      apiClient
        .get<FetchResponse<Genre>>("/genres")
        .then((res) => res.data.results),
  });

export default useGenres;
