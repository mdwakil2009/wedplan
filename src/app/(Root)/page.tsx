import FeaturedServices from "@/components/home/FeaturedServices";
import HeroBanner from "@/components/home/HeroBanner";
import HowWedPlanWorks from "@/components/home/HowWedPlanWorks";

import WeddingCategories from "@/components/home/WeddingCategories";
import WeddingInspiration from "@/components/home/WeddingInspiration";
import WhyChooseWedPlan from "@/components/home/WhyChooseWedPlan";
export default function Home() {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <FeaturedServices></FeaturedServices>
      <WeddingInspiration></WeddingInspiration>
      <WeddingCategories></WeddingCategories>
      <WhyChooseWedPlan></WhyChooseWedPlan>
      <HowWedPlanWorks></HowWedPlanWorks>
    </div>
  );
}
