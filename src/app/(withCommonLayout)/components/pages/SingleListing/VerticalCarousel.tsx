import {
  Carousel,
  CarouselMainContainer,
  // CarouselNext,
  // CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/extension/embala-carousel";

const VerticalCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <Carousel orientation="vertical" className="flex items-center gap-[32px]">
      {/* <CarouselNext />
      <CarouselPrevious /> */}
      <div className="relative w-[904px]">
        <CarouselMainContainer className="h-[528px]">
          {imageUrls.map((item, index) => (
            <SliderMainItem
              key={index}
              className="border border-muted flex items-center justify-center h-[528px] rounded-xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${item})` }}
            >
              {/* Slide {index + 1} */}
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
      </div>
      <CarouselThumbsContainer className="h-[528px]">
        {imageUrls.map((item, index) => (
          <SliderThumbItem
            key={index}
            index={index}
            className="rounded-xl bg-transparent"
          >
            <div
              className="border border-muted h-[160px] w-[280px] rounded-xl cursor-pointer bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${item})` }}
            ></div>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
};

export default VerticalCarousel;
