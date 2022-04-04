export class User {
    // classes enforce behavior around how an object can be initalized
      id :number;
      username: string;
      password: string;
      email: string;
      songs: Song[];
       
    
      // google Auto Constructor Generator (it's a VScode extension)
      constructor(
        id: number,
        username: string,
        password: string,
        email: string,
        songs: Song[],
        
        
    ) {
        this.id = id
        this.username = username
        this.password = password
        this.email = email
        this.songs = songs
        
      }
    
    }
export class Song {

    id: number;
    songId: number;
    songName: string;
    artistName: string;
    

    constructor(
      id: number,
      songId: number,
      songName: string,
      artistName: string,
      
)   {
      this.id = id
      this.songId = songId
      this.songName = songName
      this.artistName = artistName
      
    }
  }