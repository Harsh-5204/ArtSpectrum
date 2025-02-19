import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './about.css'; // Import the CSS styles

function Artist() {
  const [datas, setDatas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
    fetch("http://localhost:8000/admin/getArtist")
      .then(response => response.json())
      .then(data => {
        setDatas(data.artists);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      <div className="page-heading-about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </div>
      <div className='container'><h2>Artists</h2></div>
      <div className="container">
        <div className="row">
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
            datas.map(artist => (
              <div key={artist._id} className="col-md-4 mb-4">
  <div className="custom-card">
    <Card>
      {artist.profilePic && (
        <Card.Img
          variant="top"
          src={`http://localhost:8000/images/profilePics/${artist.profilePic}`}
          alt="profileImage"
        />
      )}
      <Card.Body>
        <Card.Title>{artist.name}</Card.Title>
        <Card.Text>
          <strong>Category:</strong> {artist.category}<br />
          <strong>Experience:</strong> {artist.experiance} years
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
</div>

            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Artist;