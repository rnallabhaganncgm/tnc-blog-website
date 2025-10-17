"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight, CalendarCheck, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import "swiper/css/navigation";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Swiper as SwiperCore } from "swiper";


const events = [
    {
        image: "/assets/events-1.png",
        tag: "Bitcoin",
        title: "Solana Breakpoint 2024",
        date: "Nov 11-14, 2024",
        location: "Lisbon, Portugal",
    },
    {
        image: "/assets/events-2.png",
        tag: "Solana",
        title: "Solana Breakpoint 2024",
        date: "Nov 11-14, 2024",
        location: "Lisbon, Portugal",
    },
    {
        image: "/assets/events-3.png",
        tag: "Token",
        title: "Solana Breakpoint 2024",
        date: "Nov 11-14, 2024",
        location: "Lisbon, Portugal",
    },
    {
        image: "/assets/events-4.png",
        tag: "Ethereum",
        title: "Solana Breakpoint 2024",
        date: "Nov 11-14, 2024",
        location: "Lisbon, Portugal",
    },
    {
        image: "/assets/events-1.png",
        tag: "Bitcoin",
        title: "Solana Breakpoint 2024",
        date: "Nov 11-14, 2024",
        location: "Lisbon, Portugal",
    },
    {
        image: "/assets/events-2.png",
        tag: "Solana",
        title: "Solana Breakpoint 2024",
        date: "Nov 11-14, 2024",
        location: "Lisbon, Portugal",
    },
];


export default function UpcomingEvents() {
    const [showPrev, setShowPrev] = useState(false);
    const [centered, setCentered] = useState(false);
    const swiperRef = useRef<SwiperCore | null>(null);



    return (
        <div className="h-fit w-full bg-[#14151e] text-white p-6 relative overflow-hidden">
            <div className="w-[95%] mx-auto my-20">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div className="relative w-full">
                        <h1 className="text-[4.375rem] text-[#ffffff17] absolute bottom-3.5 font-black left-0 w-full">
                            Upcoming Events
                        </h1>
                        <h1 className="text-5xl font-medium">Upcoming Events</h1>
                    </div>
                    <Button
                        variant="outline"
                        className="bg-transparent text-[#FFFFFF99] border border-[#FFFFFF99] rounded-lg hover:text-black "
                    >
                        View Details <CalendarCheck className="h-4 w-4" />
                    </Button>
                </div>

                {/* Prev Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showPrev ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center p-3 rounded-full border border-white/25 transition-all duration-300 ${showPrev ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                >
                    <Button
                        id="prevBtn"
                        size="icon"
                        className="rounded-full bg-white text-black hover:bg-[#e3f1ff]"
                        onClick={() => {
                            swiperRef.current?.slidePrev();
                            if (swiperRef.current?.activeIndex === 1) {
                                setCentered(false);
                            }
                        }}
                    >
                        <ArrowLeft className="h-6 w-6 [&_svg]:size-6" />
                    </Button>
                </motion.div>

                {/* Next Button */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center p-3 rounded-full border border-white/25">
                    <Button
                        id="nextBtn"
                        size="icon"
                        className="rounded-full  bg-white text-black hover:bg-[#e3f1ff]"
                        onClick={() => {
                            swiperRef.current?.slideNext();
                            setCentered(true); // Activate mx-auto
                        }}
                    >
                        <ArrowRight className="h-6 w-6 [&_svg]:size-6" />
                    </Button>
                </div>
                {/* Animated Swiper Wrapper */}
                <motion.div
                    animate={{
                        marginLeft: centered ? "auto" : "0px",
                        marginRight: centered ? "auto" : "0px",
                    }}
                    transition={{ duration: 1.1, ease: [0.25, 0.8, 0.25, 1] }} // smooth AF
                    className="w-[85%]"
                >
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={4}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => {
                            setShowPrev(swiper.activeIndex !== 0);
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >
                        {events.map((event, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex justify-center">
                                    <EventCard
                                        image={event.image}
                                        tag={event.tag}
                                        title={event.title}
                                        date={event.date}
                                        location={event.location}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </div>
    );
}
interface EventCardProps {
    image: string
    tag: string
    title: string
    date: string
    location: string
}

function EventCard({ image, tag, title, date, location }: EventCardProps) {
    return (
        <div className="bg-[linear-gradient(180deg,#FFF_45.9%,transparent_100%)]  hover:bg-white rounded-3xl overflow-hidden">
            <div className="relative p-4">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute bottom-8 right-2 bg-white text-[#14151e] px-3 py-1 text-sm font-medium rounded-s-[0.23438rem]">
                    {tag}
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[#0260fe] text-sm">Upcoming</span>
                    <Share2 className="h-4 w-4 text-[#434345]" />
                </div>

                <h3 className="text-[1.125rem] font-bold mb-2 text-foreground">{title}</h3>

                <div className="flex items-center text-[#00000080] mb-1">
                    <CalendarIcon className="mr-2" />
                    <span className="text-sm">{date}</span>
                </div>

                <div className="flex items-center text-[#00000080] mb-4">
                    <LocationIcon className="mr-2" />
                    <span className="text-sm">{location}</span>
                </div>

                <Button
                    variant="outline"
                    className="w-full border border-[#222222] text-[#222222] rounded-lg bg-transparent"
                >
                    View Event
                </Button>
            </div>
        </div>
    )
}

function CalendarIcon({ className }: { className?: string }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M5.33333 7.33333H4V8.66667H5.33333V7.33333ZM8.66667 7.33333H7.33333V8.66667H8.66667V7.33333ZM12 7.33333H10.6667V8.66667H12V7.33333ZM13.3333 2.66667H12.6667V1.33333H11.3333V2.66667H4.66667V1.33333H3.33333V2.66667H2.66667C1.93333 2.66667 1.34 3.26667 1.34 4L1.33333 13.3333C1.33333 14.0667 1.93333 14.6667 2.66667 14.6667H13.3333C14.0667 14.6667 14.6667 14.0667 14.6667 13.3333V4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667ZM13.3333 13.3333H2.66667V6H13.3333V13.3333Z"
                fill="#434345"
            />
        </svg>
    )
}

function LocationIcon({ className }: { className?: string }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M8 1.33333C5.42 1.33333 3.33333 3.42 3.33333 6C3.33333 9.5 8 14.6667 8 14.6667C8 14.6667 12.6667 9.5 12.6667 6C12.6667 3.42 10.58 1.33333 8 1.33333ZM8 7.66667C7.08 7.66667 6.33333 6.92 6.33333 6C6.33333 5.08 7.08 4.33333 8 4.33333C8.92 4.33333 9.66667 5.08 9.66667 6C9.66667 6.92 8.92 7.66667 8 7.66667Z"
                fill="#434345"
            />
        </svg>
    )
}

