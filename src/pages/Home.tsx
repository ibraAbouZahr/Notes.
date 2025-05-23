import HeroSection from "../components/HomePage/HeroSection";
import NoteCrud from "../components/HomePage/NoteCrud";
function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <div className="container w-11/12 md:w-4/5 mx-auto flex flex-col items-center justify-center p-4 text-text">
        <NoteCrud></NoteCrud>
      </div>
    </div>
  );
}
export default Home;
