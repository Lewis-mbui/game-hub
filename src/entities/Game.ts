import type Platform from "@/entities/Platform";
import type Genre from "./Genre";
import type Publisher from "./Publisher";

export default interface Game {
  id: number;
  slug: string;
  genres: Genre[];
  publishers: Publisher[];
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  description_raw: string;
}
