import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const SingleImageCarousel = ({ images }: { images: string[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const totalSlides = images.length;

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-[313px] lg:w-[1168px] lg:relative">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="w-full h-[217px] lg:h-[500px] rounded-2xl bg-cover bg-center bg-no-repeat bg-gray-400"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button
        className={cn(
          "w-10 h-10 rounded-full absolute top-1/2 left-4 -translate-y-1/2 z-10 hover:bg-gray-400",
          current === 0 ? "bg-white" : "bg-colorButton"
        )}
        onClick={() => api?.scrollPrev()}
      >
        <ArrowLeft color={current === 0 ? "black" : "white"} />
      </Button>
      <Button
        className={cn(
          "w-10 h-10 rounded-full absolute top-1/2 right-4 -translate-y-1/2 z-10 hover:bg-gray-400",
          current === totalSlides - 1 ? "bg-white" : "bg-colorButton"
        )}
        onClick={() => api?.scrollNext()}
      >
        <ArrowRight color={current === totalSlides - 1 ? "black" : "white"} />
      </Button>

      <div className="flex items-center justify-center gap-4 mt-3 lg:hidden">
        <Button
          className={cn(
            "w-10 h-10 rounded-full hover:bg-gray-400",
            current === 0 ? "bg-white" : "bg-colorButton"
          )}
          onClick={() => api?.scrollPrev()}
        >
          <ArrowLeft color={current === 0 ? "black" : "white"} />
        </Button>
        <Button
          className={cn(
            "w-10 h-10 rounded-full hover:bg-gray-400",
            current === totalSlides - 1 ? "bg-white" : "bg-colorButton"
          )}
          onClick={() => api?.scrollNext()}
        >
          <ArrowRight color={current === totalSlides - 1 ? "black" : "white"} />
        </Button>
      </div>
    </div>
  );
};

export default SingleImageCarousel;
