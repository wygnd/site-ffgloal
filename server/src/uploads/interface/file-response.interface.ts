export interface FileResponse {
  name: string;
  url: string;
  size: number;
  sizes?: SizesResponse;
  type: "file" | "image" | "svg";
}

export interface SizesResponse {
  large: string,
  medium: string,
  thumbnail: string
}