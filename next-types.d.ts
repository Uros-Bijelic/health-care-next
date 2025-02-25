declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_FIREBASE_API_KEY?: string;
    NEXT_PUBLIC_AUTH_DOMAIN?: string;
    NEXT_PUBLIC_PROJECT_ID?: string;
    NEXT_PUBLIC_STORAGE_BUCKET?: string;
    NEXT_PUBLIC_MESSAGING_SENDER_ID?: string;
    NEXT_PUBLIC_APP_ID?: string;
    NEXT_PUBLIC_MEASURMENT_ID?: string;
    LOCALHOST_API?: string;

    FIREBASE_PROJECT_ID?: string;
    FIREBASE_CLIENT_EMAIL?: string;
  }
}
