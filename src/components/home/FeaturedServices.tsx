
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { getFeaturedServices } from "@/lib/action/api";

import {
  ArrowUpRight,
  Heart,
  MapPin,
  Mail,
  Sparkles,
  UserRound,
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

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    x: 25,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease,
      staggerChildren: 0.09,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    getFeaturedServices()
      .then((data) => setServices(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const getAnimation = (variants: typeof headingVariants) => {
    if (shouldReduceMotion) {
      return {
        initial: false as const,
        whileInView: "visible",
        variants,
      };
    }

    return {
      initial: "hidden" as const,
      whileInView: "visible",
      viewport: {
        once: true,
        amount: 0.2,
      },
      variants,
    };
  };

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] px-4 py-12 transition-colors duration-300 dark:bg-[#1D2421] sm:px-6 sm:py-16 lg:px-12">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[300px] w-[300px] rounded-full bg-[#E7D6C5]/30 blur-[100px] dark:bg-[#B77B65]/10" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-[300px] w-[300px] rounded-full bg-[#E3CFC0]/30 blur-[100px] dark:bg-[#D9A58E]/10" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          {...getAnimation(headingVariants)}
          className="mb-9 text-center sm:mb-11"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-[#A17B61] dark:text-[#D9A58E]">
            <motion.span
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      rotate: [0, 12, -12, 0],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={13} />
            </motion.span>

            <span className="text-[9px] font-semibold uppercase tracking-[2.5px]">
              Curated For Your Celebration
            </span>
          </div>

          <h2 className="font-serif text-3xl font-normal leading-tight text-[#382B23] dark:text-[#F5FAF6] sm:text-4xl md:text-5xl">
            The Art of a{" "}
            <span className="italic text-[#A17B61] dark:text-[#D9A58E]">
              Beautiful Wedding
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#82766B] dark:text-[#B2BDB5] sm:text-sm">
            Thoughtfully selected wedding services and exceptional
            professionals for your special celebration.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#CBB29B] dark:bg-[#65756A]" />

            <Heart
              size={12}
              className="fill-[#A17B61] text-[#A17B61] dark:fill-[#D9A58E] dark:text-[#D9A58E]"
            />

            <span className="h-px w-9 bg-[#CBB29B] dark:bg-[#65756A]" />
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-9 md:space-y-12">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-9"
              >
                <div className="h-[220px] animate-pulse bg-[#E8DED4] dark:bg-[#35413A] sm:h-[260px]" />

                <div className="flex flex-col justify-center space-y-3 py-3">
                  <div className="h-3 w-24 animate-pulse bg-[#E8DED4] dark:bg-[#35413A]" />
                  <div className="h-7 w-3/4 animate-pulse bg-[#E8DED4] dark:bg-[#35413A]" />
                  <div className="h-12 w-full animate-pulse bg-[#E8DED4] dark:bg-[#35413A]" />
                  <div className="h-12 w-full animate-pulse bg-[#E8DED4] dark:bg-[#35413A]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <motion.div
            {...getAnimation(headingVariants)}
            className="py-14 text-center"
          >
            <Heart
              size={28}
              className="mx-auto mb-4 text-[#A17B61] dark:text-[#D9A58E]"
            />

            <h3 className="font-serif text-2xl text-[#382B23] dark:text-[#F5FAF6]">
              Something Beautiful Is Coming
            </h3>

            <p className="mt-2 text-xs text-[#82766B] dark:text-[#B2BDB5]">
              Our featured wedding services will be available soon.
            </p>
          </motion.div>
        )}

        {/* Featured Services */}
        {!loading && services.length > 0 && (
          <div className="space-y-9 md:space-y-12">
            {services.map((service, index) => {
              const imageLeft = index % 2 !== 0;

              return (
                <motion.article
                  key={service._id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 35 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: shouldReduceMotion ? 0 : 0.05,
                    ease,
                  }}
                  className="group grid grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-9 lg:gap-12"
                >
                  {/* Service Image */}
                  <motion.div
                    {...getAnimation(imageVariants)}
                    className={`relative ${
                      imageLeft ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#E8DED4] dark:bg-[#35413A] sm:aspect-[5/3] md:aspect-[4/3]">
                      <Image
                        src={
                          service.images?.[0] ||
                          "/images/service-placeholder.jpg"
                        }
                        alt={service.serviceName}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Image Index */}
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, scale: 0.7 }
                      }
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                      }}
                      className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center bg-[#F8F5F0]/95 backdrop-blur-sm"
                    >
                      <span className="font-serif text-sm text-[#79543F]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </motion.div>

                    {/* Favorite Decoration */}
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: 1.12,
                              rotate: 12,
                            }
                      }
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F5F0]/90 text-[#A17B61] backdrop-blur-sm"
                    >
                      <Heart size={14} />
                    </motion.div>
                  </motion.div>

                  {/* Service Information */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: imageLeft ? 25 : -25,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.75,
                      delay: shouldReduceMotion ? 0 : 0.12,
                      ease,
                    }}
                    className={`flex flex-col justify-center py-1 ${
                      imageLeft ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    {/* Category */}
                    <motion.div
                      variants={childVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="mb-2 flex items-center gap-2"
                    >
                      <span className="h-px w-6 bg-[#B99576] dark:bg-[#D9A58E]" />

                      <span className="text-[9px] font-semibold uppercase tracking-[2px] text-[#A17B61] dark:text-[#D9A58E]">
                        {service.category}
                      </span>
                    </motion.div>

                    {/* Service Title */}
                    <h3 className="max-w-lg font-serif text-2xl font-normal leading-tight text-[#382B23] dark:text-[#F5FAF6] sm:text-3xl">
                      {service.serviceName}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 max-w-md text-xs leading-6 text-[#82766B] dark:text-[#B2BDB5]">
                      Discover exceptional{" "}
                      {(service.category || "wedding").toLowerCase()}{" "}
                      services crafted for your special celebration.
                    </p>

                    {/* Location */}
                    <div className="mt-3 flex items-center gap-2 text-[#82766B] dark:text-[#B2BDB5]">
                      <MapPin
                        size={13}
                        className="shrink-0 text-[#A17B61] dark:text-[#D9A58E]"
                      />

                      <span className="text-[11px] tracking-wide">
                        {service.location}
                      </span>
                    </div>

                    {/* Vendor Information */}
                    <div className="mt-4 flex items-center gap-3 border-y border-[#E3D7CB] py-3 dark:border-[#414C45]">
                      {/* Vendor Avatar */}
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? {}
                            : {
                                scale: 1.08,
                              }
                        }
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8D8C9] dark:bg-[#35413A]"
                      >
                        {service.vendor?.image ? (
                          <Image
                            src={service.vendor.image}
                            alt={
                              service.vendor.name || "Wedding Vendor"
                            }
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <UserRound
                            size={19}
                            className="text-[#79543F] dark:text-[#D9A58E]"
                          />
                        )}
                      </motion.div>

                      {/* Vendor Details */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[8px] font-semibold uppercase tracking-[1.5px] text-[#A17B61] dark:text-[#D9A58E]">
                          Meet Your Vendor
                        </p>

                        <p className="mt-0.5 truncate text-xs font-semibold text-[#382B23] dark:text-[#F5FAF6]">
                          {service.vendor?.name || "Wedding Professional"}
                        </p>

                        {service.vendor?.email && (
                          <div className="mt-0.5 flex items-center gap-1">
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
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[2px] text-[#A17B61] dark:text-[#D9A58E]">
                          Starting From
                        </p>

                        <p className="mt-1 font-serif text-2xl text-[#382B23] dark:text-[#F5FAF6]">
                          ৳{Number(service.price).toLocaleString("en-BD")}
                        </p>
                      </div>

                      <Link
                        href={`/services/${service._id}`}
                        className="group/btn inline-flex items-center gap-2 border-b border-[#A17B61] pb-1.5 text-xs font-medium text-[#79543F] transition-colors duration-300 hover:text-[#A17B61] dark:border-[#D9A58E] dark:text-[#D9A58E] dark:hover:text-[#F5FAF6]"
                      >
                        Explore Service

                        <motion.span
                          animate={
                            shouldReduceMotion
                              ? {}
                              : undefined
                          }
                          whileHover={{
                            x: 3,
                            y: -3,
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
          {...getAnimation(headingVariants)}
          className="mt-12 flex justify-center sm:mt-16"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 border border-[#B99576] px-6 py-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#79543F] transition-colors duration-300 hover:bg-[#79543F] hover:text-white dark:border-[#D9A58E] dark:text-[#D9A58E] dark:hover:bg-[#D9A58E] dark:hover:text-[#1D2421]"
          >
            Discover All Services

            <motion.span
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      x: 4,
                      y: -4,
                    }
              }
              className="inline-flex"
            >
              <ArrowUpRight size={15} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
