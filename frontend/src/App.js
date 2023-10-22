import React, { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [productInfo, setProductInfo] = useState(null); // To store product data

  const handleSearch = async () => {
    // Make a POST request to the Flask backend to get product information
    try {
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Every Thing is Going Well");
        setProductInfo(data.product_info);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlay = () => {
    // Use the Web Speech API to convert the product name and price to voice
    const speech = new SpeechSynthesisUtterance(`Product name is ${productInfo.name}. Price of product is ${productInfo.price}`);
    speechSynthesis.speak(speech);
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h3>Assignment</h3>
          </a>
        </div>
      </nav>

      {/* navbar end */}
      <div className="container" style={{ marginTop: '20px' }}>
        <h2>
          <label for="exampleFormControlInput1" class="form-label">
            Product Search
          </label>
        </h2>
        <div >
          <input
            class="form-control form-control-sm"
            id="exampleFormControlInput1"
            placeholder="Enter Product Name"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button type="button" class="btn btn-primary" onClick={handleSearch} style={{ marginTop: '15px' }}>Search</button>
        </div>
        <div>
          {productInfo && (
            <div className="card" style={{ width: "18rem", marginTop: "2rem" }}>
              <img
                src="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                className="card-img-top"
                alt="Product"
              />
              <div className="card-body">
                <h5 className="card-title">{productInfo.name}</h5>
                <div>{productInfo.price}</div>
                {productInfo && (
                  <div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={handlePlay}
                    >
                      Play
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
