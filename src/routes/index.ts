import { Express } from 'express'
import PlayListRoutes from './PlayList';
import ArtistRoutes from './Artist';
import AlbumRoutes from './Album'
import TrackRoutes from './Track'
import TrackAlbumRoutes from './TrackAlbum'
import UploadRoutes from './Upload'
function Routes(app: Express) {
    app.use('/api/v1/PlayList', PlayListRoutes);
    app.use("/api/v1/Artist", ArtistRoutes);
    app.use("/api/v1/Album", AlbumRoutes);
    app.use("/api/v1/Track", TrackRoutes);
    app.use("/api/v1/TrackAlbum", TrackAlbumRoutes);
    app.use("/api/v1/Upload", UploadRoutes);
}
export default Routes