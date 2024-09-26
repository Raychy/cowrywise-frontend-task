import { Photo } from "./photo";

export interface State {
    photos: Photo[];
    loading: boolean;
    loadingArray:boolean[];
    error: string | null;
    accessKey: string;
  }