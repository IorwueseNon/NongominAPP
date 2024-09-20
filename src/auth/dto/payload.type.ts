export interface PayloadType {
    email: string;
    userId: number;
    artistId?: number;
    }

export type Enable2FaType={
    secret: string
}