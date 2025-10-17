import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Button } from "../../components/ui/button";
import { LuMic } from "react-icons/lu";

const interviewCards = [
  {
    id: 1,
    interviewer: "/interviewer-1.png", 
    title: "Evolving Web3 Investment Strategies and Trends: CoinSwitch Ventures",
    timeAgo: "5 mins ago",
    date: "Nov 11, 2024",
    readTime: "4 mins read",
  },
  {
    id: 2,
    interviewer: "/interviewer-2.png",
    title: "Cardano Spot’s Role in Advancing Web3 Adoption: EMURGO Managing Director",
    timeAgo: "10 mins ago",
    date: "Nov 10, 2024",
    readTime: "6 mins read",
  },
  {
    id: 3,
    interviewer: "/interviewer-1.png",
    title: "The Future of Tokenomics: Key Metrics Every Investor Should Know",
    timeAgo: "15 mins ago",
    date: "Nov 09, 2024",
    readTime: "5 mins read",
  },
];


export const Interview = () => {
  return (
    <div>
      <div className="flex items-center justify-between  w-[95%] mx-auto">
        <div className="relative ">
          <h1 className="text-5xl text-[#0303031f] absolute bottom-3.5 font-black left-0">Interview</h1>
          <div className='flex flex-row items-center space-x-1'>
            <div className='w-2 h-5 bg-primary'></div>
            <h1 className="text-3xl font-medium">Interview</h1>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2 rounded-md border border-black px-3 py-2 text-sm text-[#1C1B1F]">
          More Interview <LuMic />
        </Button>
      </div>

      <div className="flex overflow-x-hidden no-scrollbar  ">
      <div className="flex flex-nowrap gap-6 ml-10 2xl:ml-8 mt-16">
        {interviewCards.map((card) => (
          <Card
            key={card.id}
            className="flex flex-col w-[569px] items-start gap-3 p-3 rounded-2xl border border-black/25 relative "
          >
            <Image
              src={card.interviewer}
              alt="Person"
              width={216}
              height={325}
              className="absolute w-56 h-80 z-20  left-5 object-cover -top-11"
            />
            <CardContent className="p-0 w-full bg-[#1F1F1F] rounded-xl overflow-hidden relative">
              <div className="w-full min-h-[16.5rem] relative">
               
                <Image
                  src="/design.svg"
                  alt="Design Background"
                  width={300}
                  height={300}
                  className="absolute z-0 -bottom-8 right-0 w-fit"
                />

                
                <div className="absolute -bottom-14 left-0 w-[12.95563rem] h-[12.95563rem] bg-[#24cbcd61] blur-[47.75269317626953px] rounded-full z-10" />

               
                <div className="relative z-20 pt-4 h-full">
                  
                  <div className="flex justify-end items-center">
                    
                    <div className="flex flex-col items-start gap-[0.57581rem] max-w-60 z-30">
                      <Image
                        src="/quote-right.svg"
                        alt="Quote"
                        width={55}
                        height={55}
                      />
                      <p className="text-white text-base font-medium">{card.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex items-center justify-between text-sm text-black/70 w-full">
              <div className="flex items-center gap-2">
                <span>{card.timeAgo}</span>
                <div className="w-1 h-1 bg-black/70 rounded-full" />
                <span>{card.date}</span>
              </div>

              <div className="flex items-center gap-1">
                <BookOpen className="text-black/50 h-4 w-4" />

                <span>{card.readTime}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};
