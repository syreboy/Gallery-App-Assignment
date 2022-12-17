import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = async (id) => {
    // TODO: answer here
    await fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
      method : "DELETE"
    })
      setPhotos(photos.filter((hapus) => hapus.id !== id))
    
  };

  // const submit = async () => {
  //   try {
  //     const url = " https://gallery-app-server.vercel.app/photos?q=" + submited;
  //     const res = await fetch(url);
  //     const result = await res.json();
  //     setPhotos(result);
  //     setLoading(false);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    if (sort) {
      fetch(`https://gallery-app-server.vercel.app/photos?q=${sort}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
          setPhotos(data);
          setLoading(false);
        })

    } if(submited){
      fetch(`https://gallery-app-server.vercel.app/photos?q=${submited}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      setPhotos(data)
      setLoading(false)
      })
    } if(search){
      fetch(`https://gallery-app-server.vercel.app/photos?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      setPhotos(data)
      setLoading(false)
      })
    }
    // else {
    //   fetch(" https://gallery-app-server.vercel.app/photos/?_sort=id&_order=desc")
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setPhotos(res);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       setError(error);
    //     });
    // };
    // submit ()
  }, [sort, submited, search]);

  useEffect(() => {
    setLoading(true)
    fetch("https://gallery-app-server.vercel.app/photos")
    .then((response) => response.json())
    .then((data)=> {
      console.log(data)
    setPhotos(data)
    setLoading(false)
    })
    .catch((error) =>{
      setError(error)
    })
  }, [])
  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
