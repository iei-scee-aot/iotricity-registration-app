import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

export const getPresentationEmbedUrl = (url: string) => {
  if (!url) return null;
  if (url.includes('docs.google.com/presentation')) {
    return url.replace(/\/edit.*$/, '/embed?start=false&loop=false&delayms=3000');
  }
  if (url.includes('drive.google.com/file/d/')) {
    return url.replace(/\/view.*$/, '/preview');
  }
  // If it's a direct PDF or PPT URL, we can use Google Docs Viewer
  if (url.endsWith('.pdf') || url.endsWith('.ppt') || url.endsWith('.pptx')) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  }
  return null;
};

export const formatedText = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)