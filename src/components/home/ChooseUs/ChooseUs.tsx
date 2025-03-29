import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Award, Sparkles, Phone, MapPin } from "lucide-react";
import Container from "@/components/shared/Container";
import Image from "next/image";
import choose from "@/assets/choose/2 (1).png";

const ChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Superior Protection",
      description:
        "Shields against UV rays, oxidation, bird droppings, tree sap, and other environmental contaminants.",
    },
    {
      icon: Clock,
      title: "Long-Lasting",
      description:
        "Provides years of protection with proper maintenance, outlasting traditional waxes and sealants.",
    },
    {
      icon: Sparkles,
      title: "Enhanced Gloss",
      description:
        "Creates a deep, mirror-like finish that enhances your vehicle's appearance and color depth.",
    },
    {
      icon: Award,
      title: "Easy Maintenance",
      description:
        "Hydrophobic properties repel water and contaminants, making cleaning easier and less frequent.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Our Ceramic Coating
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our premium ceramic coating provides unmatched protection and
            aesthetics for your vehicle, with benefits that last for years.
          </p>
        </div>

        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="bg-[#1A202C] hover:shadow-md transition-shadow shadow-md border border-gray-400 shadow-blue-900 rounded"
                  >
                    <CardHeader className="text-center">
                      <Icon className="h-12 w-12 mx-auto text-primary mb-2" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="">
              <h1 className="text-2xl md:text-3xl font-bold  mb-4">
                Washing and Cleaning of Your Car
              </h1>

              <div className="space-y-4 text-gray-200 mb-6">
                <p>
                  Our automated car wash stations save time, providing a quick
                  and efficient cleaning process. Enjoy seasonal discounts and
                  promotional offers to keep your car looking its best.
                </p>

                <ul className="list-disc pl-5 space-y-4">
                  <li>Exterior deep cleaning</li>
                  <li>Interior vacuuming</li>
                  <li>Wheel and tire service</li>
                </ul>
              </div>
            </div>
            <div className=" ">
              <Image
                src={choose}
                alt="Professional car wash service"
                width={1000}
                height={600}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center sm:flex-row gap-4 pt-8">
          <div className="flex items-center border bg-[#1A202C] border-gray-400 shadow-sm shadow-blue-900 text-white  px-4 py-3 w-[200px] rounded h-[55px]">
            <Phone className="h-5 w-5  mr-2" />
            <div>
              <p className="text-xs ">Call for appointment</p>
              <p className="font-medium ">8-800-10-500</p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition-colors h-[55px]">
            <MapPin className="h-5 w-5" />
            Find Location
          </button>
        </div>
      </Container>
    </section>
  );
};

export default ChooseUs;
