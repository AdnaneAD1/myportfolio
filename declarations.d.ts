declare module 'next' {
  export type Metadata = {
    title?: string | { default: string; template: string };
    description?: string;
    keywords?: string[];
    authors?: { name: string; url?: string }[];
    openGraph?: Record<string, any>;
    icons?: Record<string, any>;
    [key: string]: any;
  };

  export type NextConfig = {
    [key: string]: any;
  };
}

declare module 'next/font/google' {
  export function Fraunces(options: any): { variable: string };
  export function Source_Serif_4(options: any): { variable: string };
  export function Inter(options: any): { variable: string };
}

declare module 'next/dynamic' {
  import { ComponentType } from 'react';
  export default function dynamic<T = {}>(
    importer: () => Promise<{ default: ComponentType<T> }>,
    options?: {
      ssr?: boolean;
      loading?: () => React.ReactNode;
    }
  ): ComponentType<T>;
}

declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, setting: any);
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    loadFromImages(imagesPaths: string[]): void;
    turnToPage(pageNum: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    flip(pageNum: number, corner?: 'top' | 'bottom'): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): 'portrait' | 'landscape';
    getState(): string;
    update(): void;
    destroy(): void;
    on(event: string, appCallback: (e: any) => void): PageFlip;
    off(event: string): void;
  }
}

