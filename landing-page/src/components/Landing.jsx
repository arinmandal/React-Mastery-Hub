const Landing = () => {
  return (
    <div>
      <main>
        <div className='one'>
          <h1>
            YOUR FEET DESERVE THE BEST
          </h1>
          <p>
            YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
            SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
            SHOES.
          </p>
          <div className='shop-button'>
            <button className='btn'>Shop Now</button>
            <button className='btn category'>Category</button>
          </div>
          <div className='product-avability'>
            <p>Also available on</p>
            <div className='product-btn'>
              <img src='src\Assets\flipkart.png' alt='' />
              <img src='src\Assets\amazon.png' alt='' />
            </div>
          </div>
        </div>
        <div className='two'>
          <img src='src/Assets/shoe_image.png' alt='' />
        </div>
      </main>
    </div>
  );
};

export default Landing;
