import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingBar } from "./bookingbar";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Background Video with enhanced accessibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/video-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Professional ceramic coating application process"
          title="Ceramic Coating Service"
        >
          <source src="/videos/0304.mp4" type="video/mp4" />
          <track
            kind="descriptions"
            srcLang="en"
            label="English description"
            src="/videos/descriptions.vtt"
          />
          Your browser does not support HTML5 video.
        </video>
        {/* Dark Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 z-10 py-20">
        {/* Centered content with max-width */}
        <div className="max-w-3xl mx-auto text-center">
          {/* Main heading with semantic importance */}
          <div className={cn("transition-all duration-1000 transform")}>
            <h1
              id="hero-heading"
              className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Protect Your Car with Premium Ceramic Coating
            </h1>
          </div>

          {/* Supporting paragraph */}
          <div
            className={cn("transition-all duration-1000 delay-300 transform")}
          >
            <p className="text-xl md:text-xl text-white/90 mb-8 mx-auto max-w-2xl">
              Shine & Protect – Our professional-grade ceramic coating provides
              long-lasting protection against environmental damage while
              maintaining your vehicle&apos;s brilliant finish for years.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 transform justify-center"
            )}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg bg-white/20 text-white border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="View our ceramic coating services"
            >
              <Link href="/services" className="flex items-center">
                View Services <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Booking component */}
        <div className="mt-16">
          <BookingBar />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white transition-all duration-1000 delay-700"
        )}
        aria-hidden="true"
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mt-1"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
