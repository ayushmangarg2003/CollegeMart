import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import heroImg from "../assets/images/bg.jpg";
import ButtonHero from "./ButtonHero";

const Hero = () => {
  const cta = <ButtonHero text="Explore CollegeMart" extraStyle="btn-primary" />;

  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Best Marketplace for College Grads
        </h1>

        <p className="text-lg opacity-80 leading-relaxed">
          Buy and sell books, stationary, electronics and many more to your
          peers with ease, now in a few clicks
        </p>
        <div className="flex flex-col">{cta}</div>
        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src={heroImg}
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
