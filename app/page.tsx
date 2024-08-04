const Home = () => {
  return ( 
  <div 
  className="bg-[url('/bg.jpeg')] h-[102vh] 
  relative w-full bg-cover mt-[-75px] overflow-hidden
  text-white"> 
  <div className="flex h-full items-center justify-center pt-[82px]
  gap20 w-[90%] mx-auto max-w-[1450px]">
    <div className="grid items-center gap-6 md:grind-cols-2">
      <img src="/hero-image.png"alt="product img"
            className="ax-auto rounded-xl order-last md:min-2-[800px]
            mn-2-[500w] md:h-[500px] max-sm:px-5"></img>
    </div>
  </div>
  </div> );
}
 
export default Home;