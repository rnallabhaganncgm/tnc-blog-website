import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <div className="relative w-full border border-foreground/20 p-5 md:px-8 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      <div className="space-y-2 mb-6 md:mb-0">
        <h2 className="text-4xl font-bold tracking-tight">Never Miss An Update.</h2>
        <p className="text-gray-700 text-lg">
          Be a part of our community by subscribing to our newsletter.
        </p>
      </div>
      <div className="relative z-10"> {/* Ensures button stays on top */}
        <Button className="bg-black text-white hover:bg-black/90 p-3 text-lg rounded-none font-normal cursor-pointer">
          Subscribe Now
        </Button>
      </div>

      {/* Blurred Background Element at the Right End */}
      <div
        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-[25.4375rem] opacity-82 bg-primary/40 blur-[47.75px] z-0"
        style={{ top: "50%", right: "-100px", transform: "translateY(-50%)" }}
      />
    </div>
  );
}
