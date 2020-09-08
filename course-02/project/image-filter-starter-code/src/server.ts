import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


//  ===============================================================
//  DESCRIPTION:    
//      Endpoint to filter an image from a public url.
//  USAGE:
//      GET {{host}}/filteredimage?image_url={{URL}}
//  QUERY PARAMATERS
//      image_url: URL of a publicly accessible image
//  RETURNS
//      the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
//  IT SHOULD
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
//
//  ===============================================================
app.get('/filteredimage', 
           async (request: Request, response: Response) => 
{
    let { url } = request.query;
    
    // Validate the input (image-url)
    if (!url) {
        return response.status(400)
                       .send('Please provide a valid image-url');
    }

    // Filter the image
    try {
      const filteredpath = await filterImageFromURL(url);
      response.status(200)
              .sendFile(filteredpath, 
                        () => deleteLocalFiles([filteredpath]));
    } catch(error) {
      response.status(422)
              .send(error); 
    }
});
//! END @TODO1
 
//  ===============================================================
//  DESCRIPTION:    
//      LANDING PAGE
//  USAGE:
//      GET {{host}}
//  ===============================================================
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("Landing Page, try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();