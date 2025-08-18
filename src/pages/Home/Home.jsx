import Hero from "./Hero";
import Stats from "./Stats";
import Listings from "./Listings";
import InfoSection from "./InfoSection";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";
import Newsletter from "./Newsletter";
import Blog from "./Blog";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Hero />
      <Listings />
      <Stats />
      <InfoSection />
      <Blog />
      <Testimonial />
      <Banner />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
