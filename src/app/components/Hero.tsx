import heroImage from "../../imports/kaiina.jpg";

export function Hero() {
  return (
    <section className="relative h-screen flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: '140%', backgroundPosition: 'center', opacity: 0.7 }}></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mb-12 sm:mb-16 md:mb-20">
        <h1 className="text-5xl md:text-7xl mb-4"></h1>
        <p className="text-xl md:text-2xl text-white mb-8">
        </p>
        <p className="text-lg text-white max-w-2xl mx-auto">
        </p>
      </div>
    </section>
  );
}