"use client";

import { getServices } from "@/lib/action/service";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

type Category = {
  name: string;
  count: number;
  image: string;
};

const galleryColumns = [0, 1, 2];

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function WeddingCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const services = await getServices();

        const activeServices = services.filter(
          (service) =>
            String(service.status || "").toLowerCase() === "approved" &&
            service.isActive === true,
        );

        const categoryMap = new Map<string, Category>();

        activeServices.forEach((service) => {
          const categoryName = service.category?.trim();

          if (!categoryName) return;

          const serviceImage = Array.isArray(service.images)
            ? service.images.find(
                (image) => typeof image === "string" && image.trim() !== "",
              )
            : "";

          const existingCategory = categoryMap.get(categoryName);

          if (existingCategory) {
            existingCategory.count += 1;

            if (!existingCategory.image && serviceImage) {
              existingCategory.image = serviceImage;
            }
          } else {
            categoryMap.set(categoryName, {
              name: categoryName,
              count: 1,
              image: serviceImage || "",
            });
          }
        });

        const categoryList = Array.from(categoryMap.values()).filter(
          (category) => category.image,
        );

        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#FFFFFF] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 h-10 w-64 animate-pulse bg-[#FFFFFF]" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/3] animate-pulse bg-[#E9E0D5]"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
<section className="overflow-hidden bg-[#FFFFFF] px-5 pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#B77B65]">
            Find Your Perfect Match
          </p>

          <h2 className="font-serif text-3xl font-medium text-[#392B27] md:text-5xl">
            Explore Wedding Categories
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#85766F] md:text-base">
            Discover beautiful wedding services and find the perfect
            professionals for your special day.
          </p>
        </motion.div>

        {/* Reference Style Wedding Gallery */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-4">
            {galleryColumns.map((columnIndex) => {
              const columnCategories = categories.filter(
                (_, index) => index % 3 === columnIndex,
              );

              return (
                <div key={columnIndex} className="flex min-w-0 flex-col gap-4">
                  {columnCategories.map((category, itemIndex) => {
                    let imageHeight = "aspect-[4/3]";

                    // First Column: Short + Tall
                    if (columnIndex === 0) {
                      imageHeight =
                        itemIndex === 0 ? "aspect-[1.6/1]" : "aspect-[0.77/1]";
                    }

                    // Second Column: Equal Height
                    if (columnIndex === 1) {
                      imageHeight = "aspect-[1.04/1]";
                    }

                    // Third Column: Tall + Short
                    if (columnIndex === 2) {
                      imageHeight =
                        itemIndex === 0 ? "aspect-[0.77/1]" : "aspect-[1.6/1]";
                    }

                    return (
                      <motion.div
                        key={category.name}
                        initial={
                          shouldReduceMotion ? false : { opacity: 0, y: 35 }
                        }
                        whileInView={
                          shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                        }
                        viewport={{
                          once: true,
                          amount: 0.15,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: shouldReduceMotion ? 0 : itemIndex * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full"
                      >
                        <Link
                          href={{
                            pathname: "/services",
                            query: {
                              category: category.name,
                            },
                          }}
                          className="group block w-full"
                          aria-label={`Explore ${category.name}`}
                        >
                          {/* Category Image */}
                          <div
                            className={`w-full overflow-hidden bg-[#E9E0D5] ${imageHeight}`}
                          >
                            <motion.img
                              src={category.image}
                              alt={category.name}
                              loading="lazy"
                              className="h-full w-full object-cover"
                              whileHover={
                                shouldReduceMotion ? undefined : { scale: 1.06 }
                              }
                              transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          </div>

                          {/* Category Name Below Image */}
                          <div className="flex items-center justify-between border-b border-[#DEDCD5] py-3">
                            <h3 className="font-serif text-lg font-medium text-[#392B27] transition-colors duration-300 group-hover:text-[#B77B65] md:text-xl">
                              {category.name}
                            </h3>

                            <motion.span
                              className="shrink-0 text-[#B77B65]"
                              whileHover={
                                shouldReduceMotion
                                  ? undefined
                                  : {
                                      x: 4,
                                      y: -4,
                                    }
                              }
                              transition={{
                                duration: 0.3,
                              }}
                            >
                              <FiArrowUpRight size={20} />
                            </motion.span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-[#392B27]">
              No Categories Available
            </p>

            <p className="mt-2 text-sm text-[#85766F]">
              Approved wedding services will appear here.
            </p>
          </div>
        )}

        {/* View More */}
        {categories.length > 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 bg-[#B77B65] px-12 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#392B27]"
            >
              View More
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
