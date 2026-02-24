export interface ILoginToken {

    // Login:{AccessToken: string ;
    // ExpiresIn: number ;
    // RefreshExpiresIn: number;
    // RefreshToken: string
    // TokenType: string
    // NotBeforePolicy: string;
    // SessionState: string;
    // Scope: string;}
   
    token: string;
    user:{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        username: string;
        dateOfBirth: Date;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }
}