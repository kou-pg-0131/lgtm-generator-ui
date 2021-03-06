declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_ORIGIN: string;
    readonly NEXT_PUBLIC_LGTMS_ORIGIN: string;
    readonly NEXT_PUBLIC_GA_ID: string;
    readonly NEXT_PUBLIC_STAGE?: 'production';
  }
}
