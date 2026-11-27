
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { getFeaturedServices } from "@/lib/action/api";
import FeaturedServicesSkeleton from "./FeaturedServicesSkeleton";

import {
  ArrowUpRight,
  Heart,
  MapPin,
  Mail,
  Sparkles,
  UserRound,
  Star,
} from "lucide-react";

type Vendor = {
  name?: string;
  email?: string;
  image?: string;
};

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  location: string;
  images: string[];
  vendor?: Vendor | null;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    getFeaturedServices()
      .then((data) => {
        if (isMounted) {
          setServices(Array.isArray(data) ? data : []);
        }
      })
      .catch((error) => {
        console.error("Featured Services Error:", error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion
      ? false
      : {
          opacity: 0,
          y: 30,
        },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.75,
      delay: shouldReduceMotion ? 0 : delay,
      ease,
    },
  });

  if (loading) {
    return <FeaturedServicesSkeleton />;
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#FFFFFF] px-4 py-16 transition-colors duration-500 dark:bg-[#1D2421] sm:px-6 sm:py-20 lg:px-12 lg:py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-[380px] w-[380px] rounded-full bg-[#E7D6C5]/30 blur-[110px] dark:bg-[#B77B65]/10" />

      <div className="pointer-events-none absolute -right-40 bottom-20 -z-10 h-[380px] w-[380px] rounded-full bg-[#E3CFC0]/30 blur-[110px] dark:bg-[#D9A58E]/10" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <motion.div
          {...reveal()}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2.5">
            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { rotate: [0, 15, -15, 0] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#A17B61] dark:text-[#D9A58E]"
            >
              <Sparkles size={15} />
            </motion.span>

            <span className="text-[9px] font-semibold uppercase tracking-[3px] text-[#A17B61] dark:text-[#D9A58E]">
              Curated For Your Celebration
            </span>

            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { rotate: [0, -15, 15, 0] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#A17B61] dark:text-[#D9A58E]"
            >
              <Sparkles size={15} />
            </motion.span>
          </div>

          <h2 className="font-serif text-3xl font-normal leading-[1.2] tracking-tight text-[#382B23] dark:text-[#F5FAF6] sm:text-4xl md:text-5xl lg:text-[54px]">
            The Art of a
            <br className="sm:hidden" />{" "}
            <span className="italic text-[#A17B61] dark:text-[#D9A58E]">
              Beautiful Wedding
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-7 text-[#82766B] dark:text-[#B2BDB5] sm:text-sm">
            Thoughtfully selected wedding services and exceptional
            professionals to turn your dream celebration into
            beautiful memories.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#CBB29B] dark:bg-[#65756A]" />

            <motion.span
              animate={
                shouldReduceMotion
                  ? undefined
                  : { scale: [1, 1.18, 1] }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              <Heart
                size={13}
                className="fill-[#A17B61] text-[#A17B61] dark:fill-[#D9A58E] dark:text-[#D9A58E]"
              />
            </motion.span>

            <span className="h-px w-10 bg-[#CBB29B] dark:bg-[#65756A]" />
          </div>
        </motion.div>

        {/* Empty State */}
        {services.length === 0 && (
          <motion.div
            {...reveal()}
            className="py-16 text-center"
          >
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-[#E9DCD0] bg-white text-[#A17B61] dark:border-[#46534B] dark:bg-[#29332E] dark:text-[#D9A58E]">
              <Heart size={26} />
            </div>

            <h3 className="font-serif text-2xl text-[#382B23] dark:text-[#F5FAF6]">
              Something Beautiful Is Coming
            </h3>

            <p className="mt-3 text-xs leading-6 text-[#82766B] dark:text-[#B2BDB5]">
              Our featured wedding services will be available soon.
            </p>
          </motion.div>
        )}

        {/* Featured Services */}
        {services.length > 0 && (
          <div className="space-y-16 sm:space-y-20 lg:space-y-28">

            {services.map((service, index) => {
              const imageLeft = index % 2 !== 0;

              return (
                <motion.article
                  key={service._id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 35,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.12,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.85,
                    ease,
                  }}
                  className="group grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16"
                >

                  {/* Image Side */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: imageLeft ? -35 : 35,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.9,
                      ease,
                    }}
                    className={`relative ${
                      imageLeft ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    {/* Decorative Frame */}
                    <div
                      className={`pointer-events-none absolute -bottom-3 -top-3 hidden w-[82%] border border-[#DCC8B5] dark:border-[#65756A] sm:block ${
                        imageLeft
                          ? "-left-3"
                          : "-right-3"
                      }`}
                    />

                    {/* Main Image */}
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { y: -4 }
                      }
                      transition={{
                        duration: 0.4,
                        ease,
                      }}
                      className="relative"
                    >
                      <div className="relative aspect-[5/4] overflow-hidden bg-[#E8DED4] shadow-[0_16px_45px_rgba(75,51,35,0.09)] dark:bg-[#35413A] sm:aspect-[16/11] md:aspect-[5/4]">

                        <Image
                          src={
                            service.images?.[0] ||
                            "/images/service-placeholder.jpg"
                          }
                          alt={service.serviceName}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                        />

                        {/* Image Index */}
                        <div className="absolute bottom-4 left-4 flex size-10 items-center justify-center border border-white/50 bg-white/90 backdrop-blur-md sm:bottom-5 sm:left-5">
                          <span className="font-serif text-sm text-[#79543F]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Bottom Image Label */}
                        <div className="absolute bottom-5 right-5 hidden items-center gap-2 text-white sm:flex">
                          <span className="h-px w-7 bg-white/70" />
                          <span className="text-[8px] font-medium uppercase tracking-[2px]">
                            Your Special Moment
                          </span>
                        </div>
                      </div>

                      {/* Floating Favorite Decoration */}
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                scale: 1.12,
                                rotate: 12,
                              }
                        }
                        whileTap={{ scale: 0.92 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 15,
                        }}
                        className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-full border border-[#E8D9CB] bg-[#FFFCFA] text-[#A17B61] shadow-md dark:border-[#52635A] dark:bg-[#29332E] dark:text-[#D9A58E]"
                      >
                        <Heart size={16} />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Service Information */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: imageLeft ? 35 : -35,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.85,
                      delay: shouldReduceMotion ? 0 : 0.12,
                      ease,
                    }}
                    className={`flex flex-col justify-center py-2 ${
                      imageLeft ? "md:order-2" : "md:order-1"
                    }`}
                  >

                    {/* Category */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#B99576] dark:bg-[#D9A58E]" />

                      <span className="text-[9px] font-semibold uppercase tracking-[2.2px] text-[#A17B61] dark:text-[#D9A58E]">
                        {service.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="max-w-lg font-serif text-3xl font-normal leading-[1.2] tracking-tight text-[#382B23] dark:text-[#F5FAF6] sm:text-4xl lg:text-[42px]">
                      {service.serviceName}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 max-w-md text-xs leading-7 text-[#82766B] dark:text-[#B2BDB5] sm:text-sm">
                      Discover exceptional{" "}
                      {(service.category || "wedding").toLowerCase()}{" "}
                      services crafted with care, creativity and
                      attention to every little detail of your
                      special celebration.
                    </p>

                    {/* Location */}
                    <div className="mt-5 flex items-center gap-2 text-[#82766B] dark:text-[#B2BDB5]">
                      <MapPin
                        size={14}
                        className="shrink-0 text-[#A17B61] dark:text-[#D9A58E]"
                      />

                      <span className="text-[11px] tracking-wide">
                        {service.location}
                      </span>
                    </div>

                    {/* Vendor Information */}
                    <div className="mt-6 flex items-center gap-3 border-y border-[#E3D7CB] py-4 dark:border-[#414C45]">

                      {/* Vendor Avatar */}
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { scale: 1.08 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 300,
                        }}
                        className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#E5D5C6] bg-[#E8D8C9] dark:border-[#52635A] dark:bg-[#35413A]"
                      >
                        {service.vendor?.image ? (
                          <Image
                            src={service.vendor.image}
                            alt={
                              service.vendor.name ||
                              "Wedding Vendor"
                            }
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <UserRound
                            size={20}
                            className="text-[#79543F] dark:text-[#D9A58E]"
                          />
                        )}
                      </motion.div>

                      {/* Vendor Details */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[8px] font-semibold uppercase tracking-[1.7px] text-[#A17B61] dark:text-[#D9A58E]">
                          Your Wedding Professional
                        </p>

                        <p className="mt-1 truncate text-xs font-semibold text-[#382B23] dark:text-[#F5FAF6]">
                          {service.vendor?.name ||
                            "Wedding Professional"}
                        </p>

                        {service.vendor?.email && (
                          <div className="mt-1 flex items-center gap-1.5">
                            <Mail
                              size={10}
                              className="shrink-0 text-[#A17B61] dark:text-[#D9A58E]"
                            />

                            <span className="truncate text-[10px] text-[#82766B] dark:text-[#B2BDB5]">
                              {service.vendor.email}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="hidden items-center gap-1 text-[#A17B61] dark:text-[#D9A58E] sm:flex">
                        <Star
                          size={12}
                          className="fill-current"
                        />
                        <span className="text-[8px] font-semibold uppercase tracking-wider">
                          Selected
                        </span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-5">

                      {/* Price */}
                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[2px] text-[#A17B61] dark:text-[#D9A58E]">
                          Starting From
                        </p>

                        <p className="mt-1 font-serif text-3xl text-[#382B23] dark:text-[#F5FAF6]">
                          ৳
                          {Number(service.price).toLocaleString(
                            "en-BD"
                          )}
                        </p>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/services/${service._id}`}
                        className="group/btn inline-flex items-center gap-3 border-b border-[#A17B61] pb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#79543F] transition-colors duration-300 hover:border-[#79543F] hover:text-[#A17B61] dark:border-[#D9A58E] dark:text-[#D9A58E] dark:hover:text-[#F5FAF6]"
                      >
                        Explore Service

                        <motion.span
                          animate={
                            shouldReduceMotion
                              ? undefined
                              : { x: [0, 3, 0], y: [0, -3, 0] }
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                          className="inline-flex"
                        >
                          <ArrowUpRight size={15} />
                        </motion.span>
                      </Link>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Explore All Services */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-6 lg:mt-14"
        >
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-[#E8C7D1] dark:bg-[#3D4842] sm:block"
          />

          <Link
            href="/services"
            className="group relative inline-flex min-h-[52px] w-full items-center justify-center gap-3 overflow-hidden border border-[#772D43] px-9 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#772D43] transition-colors duration-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#772D43] dark:border-[#E8C7D1] dark:text-[#E8C7D1] dark:hover:text-[#392B32] dark:focus-visible:outline-[#E8C7D1] sm:w-auto"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left scale-x-0 bg-[#772D43] transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none dark:bg-[#E8C7D1]"
            />
            <span className="relative z-10">Discover All Services</span>
            <ArrowUpRight
              size={15}
              strokeWidth={1.5}
              aria-hidden="true"
              className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </Link>

          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-[#E8C7D1] dark:bg-[#3D4842] sm:block"
          />
        </motion.div>

      </div>
    </section>
  );
}
